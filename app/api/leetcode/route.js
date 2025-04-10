
export async function GET(request) {
  try {
    console.log("Fetching data...");
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
                languageStats: matchedUser(username: "Last-Autumn-Leaf") {
                    languageProblemCount {
                      languageName
                      problemsSolved
                    }
              }
            userProfileUserQuestionProgressV2: userProfileUserQuestionProgressV2(userSlug: "Last-Autumn-Leaf") {
                numAcceptedQuestions {
                  count
                  difficulty
                }
                numFailedQuestions {
                  count
                  difficulty
                }
                numUntouchedQuestions {
                  count
                  difficulty
                }
                userSessionBeatsPercentage {
                  difficulty
                  percentage
                }
            }
          }
        `
      })
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      console.error('Failed to parse JSON:', error.message);
    }

    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.message || 'Something went wrong' }), { status: response.status });
    }

    return new Response(JSON.stringify(data),
      {
        status: 200 ,
        headers: { 'Cache-Control': 'no-cache' }}
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
