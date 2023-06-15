import { formComponentValid } from './common'

const validateList = [
  {
    selector: '.form-input-1',
    ruleList: [
      { text: '欄位必填', rule: (value) => value !== '' },
      { text: '欄位長度大於6', rule: (value) => value.length >= 6 },
      { text: '欄位長度大於10', rule: (value) => value.length >= 10 },
    ]
  },
  {
    selector: '.form-input-2',
    ruleList: [
      { text: '欄位必填', rule: (value) => value !== '' },
    ]
  },
]

formComponentValid(validateList)
