const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");

describe("_saveQuestion", () => {
  test("should save the question and update the user", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "sarahedo",
    };

    const savedQuestion = await _saveQuestion(question);
    console.log(savedQuestion);
    expect(savedQuestion).toEqual({
      id: expect.any(String),
      timestamp: expect.any(Number),
      author: "sarahedo",
      optionOne: {
        votes: [],
        text: "Option One",
      },
      optionTwo: {
        votes: [],
        text: "Option Two",
      },
    });
  });
  test("Should not work if the one of one parameter is missing", async () => {
    const question = {
      optionOneText: "Bruce Dickinson",
      author: "sarahedo",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  test("should return true for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    });

    expect(response).toBeTruthy();
  });

  test("should return error for incorrect parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: undefined,
      qid: undefined,
      answer: "optionTwo",
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
