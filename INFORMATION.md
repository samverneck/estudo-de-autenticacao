# Authentication

There are three ways to authenticate through GitHub API v3. Requests that require authentication will return **404 Not Found**, instead of **403 Forbidden**, in some places. This is to prevent the accidental leakage of private repositories to unauthorized users.

## Basic Authentication

> curl -u "username" https://api.github.com

## OAuth2 Token (sent in a header)

> curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com

## OAuth2 Token (sent as a parameter)

> curl https://api.github.com/?access_token=OAUTH-TOKEN

Read more about OAuth2. Note that OAuth2 tokens can be acquired programmatically, for applications that are not websites.

Fonts: 
* https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/

* https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization

## OAuth2 Key/Secret

> curl 'https://api.github.com/users/whatever?client_id=xxxx&client_secret=yyyy'

This should only be used in server to server scenarios. Don't leak your OAuth application's client secret to your users

Read more about unauthenticated rate limiting. [https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications]

## Failed login limit

Authenticating with invalid credentials will return **401 Unauthorized**

> HTTP/1.1 401 Unauthorized

{
  "message": "Bad credentials",
  "documentation_url": "https://developer.github.com/v3"
}

After detecting several requests with invalid credentials within a short period, the API will temporarily reject all authentication attempts for that user (including ones with valid credentials) with **403 Forbidden**:

> curl -i https://api.github.com -u valid_username:valid_password
HTTP/1.1 403 Forbidden

{
  "message": "Maximum number of login attempts exceeded. Please try again later.",
  "documentation_url": "https://developer.github.com/v3"
}