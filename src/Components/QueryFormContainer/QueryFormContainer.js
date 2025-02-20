import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import MovesetButton from '../MovesetButton/MovesetButton.js';
import UseWindowSize from '../../Utils/Hooks/useWindowSize.js';
import './QueryFormContainer.css';

/**
 * @param {*}
 * handleTextChange - modifies the Solve.js state based on entered scramble text
 * handleNumberChange - modifies the Solve.js state based on entered depth
 * handleRandomExample - modifies the Solve.js queriesState with a randomly generated example
 * handleSubmit - runs the solve function with parameters, or queries the backend if implemented with the cloud
 * handleCancel - cancels the computation from the submit function
 * handleMovesetClick - modifies the Solve.js state based on toggled moves
 * queriesState - all of the scramble, depth, and moveset
 * isSpinner - the ste if the spinner should show
 * @usage Used in Solve.js
 */
function QueryFormContainer({ handleTextChange, handleNumberChange, handleRandomExample, handleSubmit, handleCancel, handleMovesetClick, queriesState, isSpinner }) {
    //* misc
    // custom hook to dynamically re-render on window size changes
    let windowSize = UseWindowSize();

    //* helpers
    function determineScramblePlaceholderText() {
        if (windowSize.width <= 352) {
            return '[Tap here to enter]';
        } else if (windowSize.width <= 395) {
            return '[Tap here to enter scramble]';
        } else if (windowSize.width <= 767) {
            return '[Tap here to enter scramble you want to solve]';
        } else if (windowSize.width <= 825) {
            return '[Tap here to enter scramble]';
        }
        return '[Click here to enter scramble you want to solve]';
    }

    function determineDepthPlaceholderText() {
        if (windowSize.width <= 352) {
            return '[Tap here to enter]';
        } else if (windowSize.width <= 395) {
            return '[Tap here to enter max algorithm length]';
        } else if (windowSize.width <= 767) {
            return '[Tap here to enter maximum algorithm length]';
        } else if (windowSize.width <= 825) {
            return '[Tap here to enter max algorithm length]';
        }
        return '[Click here to enter maximum algorithm length]';
    }

    // creates an entire row of moveset buttons
    const createManyJsxButtons = (listOfLetters) => {
        const listOfButtons = [];
        for (let letter of listOfLetters) {
            listOfButtons.push(
                <MovesetButton
                    value={letter}
                    key={letter}
                    handleMovesetClick={handleMovesetClick}
                    isToggled={queriesState.moveset.includes(letter)}
                />
            );
        }
        return listOfButtons;
    }

    // TODO: weird stuff going on and not sure if i need to re-render anyway
    // create arrays of JSX buttons
    //const buttonListFaceMoves = useMemo(() => createManyJsxButtons(['R', 'U', 'D', 'F', 'L', 'B']), [queriesState.moveset]);
    // const buttonListWideMoves = useMemo(() => createManyJsxButtons(['r', 'u', 'd', 'f', 'l', 'b']), [queriesState.moveset]);
    // const buttonListSliceAndRotation = useMemo(() => createManyJsxButtons(['M', 'S', 'E', 'x', 'y', 'z']), [queriesState.moveset]);
    const buttonListFaceMoves = createManyJsxButtons(['R', 'U', 'D', 'F', 'L', 'B']);
    const buttonListWideMoves = createManyJsxButtons(['r', 'u', 'd', 'f', 'l', 'b']);
    const buttonListSliceAndRotation = createManyJsxButtons(['M', 'S', 'E', 'x', 'y', 'z']);

    return (
        // queryFormContainer goes here
        <div className="queryFormContainer">
            <section>

                <label className="scrambleLabel mainText mainColor" htmlFor="scrambleInput">Scramble
                    <div className="iconAndTooltip">
                        <FontAwesomeIcon icon={faCircleInfo} className="scrambleIcon icon mainText" />
                        <div className="scrambleTooltip tooltip accentColor">
                            <p>Enter the scramble you want to solve.</p>
                            <p>Example: R U R' y R' F R U' R' F' R</p>
                        </div>
                    </div>
                </label>

                <input
                    id="scrambleInput"
                    type="text"
                    placeholder={determineScramblePlaceholderText()}
                    className="secondaryColor mainText"
                    name="scramble"
                    autoComplete="off"
                    value={queriesState.scramble}
                    onChange={handleTextChange}
                />

            </section>


            <section>

                <label className="mainText mainColor" htmlFor="depthInput">Max Algorithm Length
                    <div className="iconAndTooltip">
                        <FontAwesomeIcon icon={faCircleInfo} className="depthIcon icon mainText" />
                        <div className="depthTooltip tooltip accentColor">
                            <p>Enter the maximum length of solutions the solver should give.</p>
                            <p>Example: 14 means you will receive solutions of at most 14 moves.</p>
                        </div>
                    </div>
                </label>

                <input
                    id="depthInput"
                    type="text"
                    placeholder={determineDepthPlaceholderText()}
                    className="secondaryColor mainText"
                    name="depth"
                    autoComplete="off"
                    value={queriesState.depth}
                    onChange={handleNumberChange}
                />
            </section>


            <section>

                <label className="mainText mainColor">Toggle allowed moveset
                    <div className="iconAndTooltip">
                        <FontAwesomeIcon icon={faCircleInfo} className="movesetIcon mainText icon" />
                        <div className="movesetTooltip tooltip accentColor">
                            <p>Enter the move types you want the solutions to be restricted to.</p>
                            <p>Example: if you enter RUD, solutions will at most use those three move types.</p>
                        </div>
                    </div>
                </label>
                <div className="buttonGrid">
                    {buttonListFaceMoves}
                    {buttonListWideMoves}
                    {buttonListSliceAndRotation}
                </div>

            </section>

            <section className="submitAndCancel">
                <button
                    className="bottomButton submitButton mainText secondaryColor"
                    onClick={() => handleSubmit(queriesState)}
                >
                    {isSpinner ?
                        (<>
                            Generating Solutions <FontAwesomeIcon className="spinner fa-lg" icon={faSpinner} />
                        </>)
                        : 'Show Me Solutions!'
                    }
                </button>
                <button onClick={() => {
                    handleCancel();
                    }
                }
                    className="bottomButton cancelButton mainText secondaryColor"
                >
                    Cancel
                </button>

                <button onClick={() => {
                    handleRandomExample();
                    }
                }
                    className="bottomButton randomExampleButton mainText secondaryColor"
                >
                    Try a Random Example
                </button>
            </section>

        </div>
    );
}

export default QueryFormContainer;