import { backendURL } from "@/constants";
import { TPostFeedback } from "@/types/feedback";

export class FeedService {
  post = async ({ userId, rating, message, accessToken }: TPostFeedback) => {
    const response = await fetch(`${backendURL}/feedback/post`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        rating,
        message,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };
}
