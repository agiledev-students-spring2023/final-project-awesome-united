# Homie - The Contributing Guide

## Setting up a local environment:
<br>
To setup a local environment, simply clone the remote repository using your preffered method (ie `git clone https://github.com/agiledev-students-spring-2023/final-project-awesome-united.git` ). Once cloned, you are required to make a seperate branch, IF you plan on contributing any code to the project. 

See [version-control](##version-control-workflow) for more info on local branching and why it is required.

</br>

## Building and testing the project:
<br>

TBD
</br>

## Version Control Workflow:
<br>

For the Homie project, we follow the **Feature Branch Version Control Workflow**. What does this mean? Simply put if you wish to address an issue or feature task, you must create your own branch of the project code that will address said specific issue or feature task. Upon creating your branch, you are then expected to update the task board to reflect the status of the issue/feature task being addressed -- from "backlog" to "in process".
<p>
Once you feel this feature/issue task has been properly implemented or addressed you then push the feature branch to our github repo and subsequently issue a pull request so that your branch may be implemented into the main branch. At this point you would then move the task in the task board from "in process" to "awaiting review". From here, someone other than yourself will then analyze your code, and if it all checks out will then approve your feature branch's merge with the main branch.
<p>
Adding the feature branch to the main branch is as simple as either the original contributor OR the reviewer merging, LOCALLY, the changes from the feature branch onto the main branch and then pushing it to the remote repo. Note, the reviewer and the contributor must coordinate as to who will be performing the merge action. Once this has been done, the taskboard is to be updated to reflect the completion of the task.
<p>
If an implementation fails inspection, it is expected of the reviewer to provide feedback specifying the issues to the original contributor. The contributor is to then fix all the problems. Once all have been addressed, the contributor is to notify the reviewer.
<p>

For a more detailed explanation, along with "git" command examples, see: [Feature Branch Version Control Workflow](https://knowledge.kitchen/content/courses/agile-development-and-devops/notes/feature-branch-workflow/)
</br>