//[M:M] ACCOUNTS-ROLES
import {Account} from "./models/Account.ts";
import {Role} from "./models/Role.ts";
import {AccountRoles} from "./models/AccountRoles.ts";
//[1:1] ACCOUNT-CONFIRMATION
import {Confirmation} from "./models/Confirmation.ts";
//[1:M] ACCOUNT-SESSIONS
import {Session} from "./models/Session.ts";
//[1:M] ACCOUNT-REPOSITORIES
import {Repository} from "./models/Repository.ts";
//[M:M] ACCOUNTS-REPOSITORIES | COLLABORATORS
import {Collaborator} from "./models/Collaborator.ts";
//[1:M] REPOSITORY-ISSUES
//[1:M] ACCOUNT-ISSUES
import {Issue} from "./models/Issue.ts";
//[1:M] ISSUE-MESSAGES
//[1:M] ACCOUNT-MESSAGES
import {IssueMessage} from "./models/IssueMessage.ts";

//ACCOUNT-SESSIONS
Account.hasMany(Session, {foreignKey: "accountId"});
//ACCOUNT-REPOSITORIES
Account.hasMany(Repository, {foreignKey: "ownerId"});

//START ##### ACCOUNTS-ROLES
Account.belongsToMany(Role, {
    through: AccountRoles,
    foreignKey: "account_id"
});


Role.belongsToMany(Account, {
    through: AccountRoles,
    foreignKey: "role_id"
});
//END ##### ACCOUNTS-ROLES
Account.hasOne(Confirmation, {foreignKey: "userId"});

//START ##### ACCOUNTS-REPOSITORIES | COLLABORATORS
Account.belongsToMany(Repository, {
    through: Collaborator,
    foreignKey: "collaborator_id"
});

Repository.belongsToMany(Account, {
    through: Collaborator,
    foreignKey: "repository_id"
});
//END ##### ACCOUNTS-REPOSITORIES | COLLABORATORS

//REPOSITORY-ISSUES
Repository.hasMany(Issue, {foreignKey: "repositoryId"});
// ACCOUNT-ISSUES
Account.hasMany(Issue, {foreignKey: "creatorId"});

//ISSUE-MESSAGES
Issue.hasMany(IssueMessage, {foreignKey: "issueId"});
//ACCOUNT-MESSAGES
Account.hasMany(IssueMessage, {foreignKey: "accountId"})


await Account.sync();
await Role.sync();
await AccountRoles.sync();

await Confirmation.sync();

await Session.sync();

await Repository.sync();
await Collaborator.sync();

await Issue.sync();
await IssueMessage.sync();