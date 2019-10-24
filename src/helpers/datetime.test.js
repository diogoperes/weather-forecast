import { getWeekday } from './datetime';

describe('Test getWeekday', () => {
    test.each`
        input     | expectedResult
        ${ new Date('2019-10-20')}  | ${ 'Sunday' }
        ${ new Date('2019-10-21')}  | ${ 'Monday' }
        ${ new Date('2019-10-22')}  | ${ 'Tuesday' }
        ${ new Date('2019-10-23')}  | ${ 'Wednesday' }
        ${ new Date('2019-10-24')}  | ${ 'Thursday' }
        ${ new Date('2019-10-25')}  | ${ 'Friday' }
        ${ new Date('2019-10-26')}  | ${ 'Saturday' }
        ${ undefined}  | ${ getWeekday(new Date()) }
        // add new test cases here
        `('converts $input to $expectedResult', ({ input, expectedResult }) => {
            expect(getWeekday(input)).toBe(expectedResult)
    })
});
