var cc = DataStudioApp.createCommunityConnector();

// This function is called by Looker Studio when creating a new Data Connection to know what the Auth Type used by the community connector is. In this community connector it's set to "NONE" as there no need for authentication with only Google services(Google Sheets & Google Drive) being called by the connector.
// https://developers.google.com/datastudio/connector/reference#getauthtype
function getAuthType() {
  var AuthTypes = cc.AuthType;
  return cc
    .newAuthTypeResponse()
    .setAuthType(AuthTypes.NONE)
    .build();
}
