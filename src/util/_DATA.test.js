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
