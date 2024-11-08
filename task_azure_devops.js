const axios = require("axios");

// Replace these with your actual values
const organization = "Olopo";
const project = "ERP";
const epicId = "447"; // The ID of the epic under which the feature will be created
const personalAccessToken = "PAT"; // Your personal access token

// Base64 encode the PAT for authentication
const token = Buffer.from(":" + personalAccessToken).toString("base64");
const authHeader = { Authorization: "Basic " + token };

/**
 * Creates a work item of the specified type under a parent work item.
 *
 * @param {string} parentId - The ID of the parent work item.
 * @param {string} workItemType - The type of work item to create (e.g., "Feature", "User Story", "Task").
 * @param {string} title - The title of the work item to create.
 * @param {object} additionalFields - An object containing additional fields to set on the work item.
 * @returns {Promise<number>} - The ID of the created work item.
 */
async function createWorkItemUnderParent(
  parentId,
  workItemType,
  title,
  additionalFields = {}
) {
  const url = `https://dev.azure.com/${organization}/${project}/_apis/wit/workitems/$${encodeURIComponent(
    workItemType
  )}?api-version=7.0`;

  // Base document with the title and parent link
  const document = [
    {
      op: "add",
      path: "/fields/System.Title",
      value: title,
    },
    {
      op: "add",
      path: "/relations/-",
      value: {
        rel: "System.LinkTypes.Hierarchy-Reverse",
        url: `https://dev.azure.com/${organization}/_apis/wit/workItems/${parentId}`,
        attributes: {
          comment: `Linking ${workItemType} to parent ID ${parentId}`,
        },
      },
    },
  ];

  // Add additional fields to the document
  for (const [field, value] of Object.entries(additionalFields)) {
    document.push({
      op: "add",
      path: `/fields/${field}`,
      value: value,
    });
  }

  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json-patch+json",
        ...authHeader,
      },
      data: document,
    });

    console.log(
      `${workItemType} created successfully with ID:`,
      response.data.id
    );
    return response.data.id;
  } catch (error) {
    console.error(
      `Error creating ${workItemType}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

/**
 * Updates fields on an existing work item.
 *
 * @param {number} workItemId - The ID of the work item to update.
 * @param {object} fieldsToUpdate - An object containing fields to update.
 */
async function updateWorkItem(workItemId, fieldsToUpdate) {
  const url = `https://dev.azure.com/${organization}/${project}/_apis/wit/workitems/${workItemId}?api-version=7.0`;

  const document = [];

  for (const [field, value] of Object.entries(fieldsToUpdate)) {
    document.push({
      op: "add",
      path: `/fields/${field}`,
      value: value,
    });
  }

  try {
    const response = await axios({
      method: "patch",
      url: url,
      headers: {
        "Content-Type": "application/json-patch+json",
        ...authHeader,
      },
      data: document,
    });

    console.log(`Work item ${workItemId} updated successfully.`);
  } catch (error) {
    console.error(
      `Error updating work item ${workItemId}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

(async () => {
  try {
    // Step 1: Create a Feature under the Epic and assign it to 'stanly.math.ai@olopo.app' with state 'Active'
    const featureTitle = "Feature Title";
    const featureId = await createWorkItemUnderParent(
      epicId,
      "Feature",
      featureTitle
    );

    // Update the Feature
    await updateWorkItem(featureId, {
      "System.AssignedTo": "stanly.math.ai@olopo.app",
      "System.State": "Active",
    });

    // Step 2: Create a User Story under the Feature and assign it to 'stanly.math.ai@olopo.app' with state 'QA'
    const userStoryTitle = "User Story Title";
    const userStoryId = await createWorkItemUnderParent(
      featureId,
      "User Story",
      userStoryTitle
    );

    // Update the User Story
    await updateWorkItem(userStoryId, {
      "System.AssignedTo": "stanly.math.ai@olopo.app",
      "System.State": "QA",
      "System.Description":
        "This user story covers the implementation of XYZ features.",
      "System.Tags": "Frontend; Priority 1",
    });

    // Step 3: Create a Task under the User Story and assign it to 'stanly.math.ai@olopo.app' with state 'Ready for QA'
    const taskTitle = "authentication module";
    const taskId = await createWorkItemUnderParent(
      userStoryId,
      "Task",
      taskTitle
    );

    // Update the Task
    await updateWorkItem(taskId, {
      "System.AssignedTo": "stanly.math.ai@olopo.app",
      "System.State": "Ready for QA",
    });
  } catch (error) {
    console.error("An error occurred during the creation process.");
  }
})();
