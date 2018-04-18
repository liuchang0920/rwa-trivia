import { Game, Question, Category } from '../src/app/model';
import { ESUtils } from './ESUtils';

const functions = require('firebase-functions');

exports.onQuestionWrite = functions.firestore.document('/questions/{questionId}').onWrite((change, context) => {
  //exports.onQuestionWrite = functions.database.ref('/questions/published/{questionId}').onWrite(event => {
  //console.log(event);
  //console.log(event.data);
  //console.log(event.data.data());

  //console.log(event.params);
  //console.log(event.params.questionId);

  //let esUtils = new ESUtils();
  //getCategories().then(function (categories: Category[]) {
  //console.log(categories);
  const data = change.after.data();

  if (data) {
    //add or update
    ESUtils.createOrUpdateIndex(ESUtils.QUESTIONS_INDEX, data.categoryIds["0"], data, context.params.questionId);
  }
  else {
    //delete
    ESUtils.removeIndex(ESUtils.QUESTIONS_INDEX, context.params.questionId);
  }
  //});
});

