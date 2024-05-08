import type { GoogleUser, NewUser } from '../types/user'

export function mapGoogleUserToUser(googleUser: GoogleUser): NewUser {
  return {
    name: googleUser.name,
    email: googleUser.email,
    picture: googleUser.picture,
  }
}

export async function validateGoogleTokenAndGetUserData(token: string) {
  try {
    // Use the access token to request user information from Google's UserInfo endpoint
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!userInfoResponse.ok) {
      // If the response is not ok, throw an error
      throw new Error('Failed to fetch user info from Google')
    }

    // Parse the response body to get user data
    const userData = (await userInfoResponse.json()) as GoogleUser

    return mapGoogleUserToUser(userData)
  } catch (error) {
    console.error('Error validating Google token and getting user data:', error)
    return null
  }
}
