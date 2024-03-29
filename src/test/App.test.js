import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GameContext } from '../contexts/GameContext';
import Tutorial from '../component/Tutorial';
import Card from '../component/Card';
import Button from '../component/Button';

Enzyme.configure({ adapter: new Adapter() });

it('<Button> component renders correctly', () => {
	const tree = renderer
		.create(
			<GameContext.Provider
				value={{
					isResultReady: false,
					compareClass: 'button',
					totalRound: [],
					globalRankingArray: []
				}}
			>
				<Button />
			</GameContext.Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

describe('enzyme context snapshot for <Card>', () => {
	it('should render children for snapshot', () => {
		const tree = shallow(<Card />);
		expect(tree).toMatchSnapshot();
	});
});

describe('Tutorial component', () => {
	const wrapper = shallow(<Tutorial />);
	it('introRound starts at 0', () => {
		const countState = wrapper.state().introRound;
		expect(countState).toEqual(0);
		// starts at the beginning of the array to render in desired order
	});
	it('introData[0].key to be 1', () => {
		const dataKey = wrapper.state().introData[0].key;
		expect(dataKey).toBe(1);
		// unique numeric key to denote order of display
	});
	it('introData yes img src(object key value pair)', () => {
		const introDataYesImg = wrapper.state().introData[0].yes;
		expect(introDataYesImg).toEqual(expect.stringContaining('./imageStock/intro1.png'));
		// test string containing
	});
	it('introData yes img src(string)', () => {
		const introDataYesImg = wrapper.state().introData[0];
		expect(introDataYesImg).toEqual(expect.objectContaining({ yes: './imageStock/intro1.png' }));
		// test object containing
	});
	it('introMsg length of 2', () => {
		const introMsg = wrapper.state().introMsg;
		expect(introMsg).toHaveLength(2);
		// test exact length
	});
	it('isIntroDone to be falsy', () => {
		const isIntroDone = wrapper.state().isIntroDone;
		expect(isIntroDone).toBeFalsy();
		// test false condition
	});
});
