import React, { Component } from 'react';
import {
    Container,
} from "reactstrap";
class MarsArea extends Component {
    constructor(props) {
        console.log('tg..constructor maresarea')

        super(props);
        console.log('props:', props)
        //this.state = { resources : []};
    }

    render() {
        const { currentX, currentY, currentDir, errorOccured } = this.props.state;
        //console.log('tg Marsarea-render this.state:',this.state, ' this.props:',this.props)
        return (
            <div>
                <Container fluid>
                    <div className="col-md-6">
                        <h2>
                            <span className="badge badge-success">
                                Final position : {currentX + '-' + currentY + '-' + currentDir + ' ' + errorOccured}
                            </span>
                        </h2>
                    </div>
                </Container>
            </div>
        );
    }

    // deneme(){
    //     const cardinals = {
    //         N: {
    //           L: 'W',
    //           R: 'E',
    //           move: (x, y)=>{
    //             return {x:x, y:y+1};
    //           },
    //         },
    //         E: {
    //           L: 'N',
    //           R: 'S',
    //           move: (x, y)=>{
    //             return {x:x+1, y:y};
    //           },
    //         },
    //         S: {
    //           L: 'E',
    //           R: 'W',
    //           move: (x, y)=>{
    //             return {x:x, y:y-1};
    //           },
    //         },
    //         W: {
    //           L: 'S',
    //           R: 'N',
    //           move: (x, y)=>{
    //             return {x:x-1, y:y};
    //           },
    //         },
    //       }; 
    //       const processInput = () => {
    //           console.log('tg..added processInput')
    //       };

    //       const failures  = () => {
    //         console.log('tg..added failures')
    //       };

    //       const rover = () => {
    //         console.log('tg..added rover')
    //       }

    //       //The main function that takes the input and gives the desired output:
    //       //mission higher order function
    //       const runMission = (input) => {
    //         const plateauBounds = processInput.establishBounds(input);
    //         const rovers = processInput.createRovers(input);
    //         const directions = processInput.listDirections(input);
    //         const movedRoversArr = [];
    //         //iterate over the rovers and each rover's corresponding directions
    //         for (let i=0; i<directions.length; i++) {
    //           movedRoversArr.push(executeDirections(directions[i], rovers[i], movedRoversArr));
    //         }

    //         for (let j=0; j<movedRoversArr.length; j++) {
    //           const inBounds = failures.checkBounds(movedRoversArr[j], plateauBounds);
    //           if (!inBounds) throw 'rover at position ' + j + ' is out of bounds.';
    //         }

    //         const result = processOutput(movedRoversArr);
    //         return result;
    //       };
    //       //Functions that parse the input string and prints the output string
    //       //Parsing and printing functions
    //       const establishBounds = (input) => {
    //         const bounds = {};
    //         input = input.split('\n')[0].split(' ');
    //         bounds.x = parseInt(input[0]);
    //         bounds.y = parseInt(input[1]);
    //         return bounds;
    //       };

    //       const createRovers = (input) => {
    //         const rovers = [];
    //         input = input.split('\n');
    //         for (let i=1; i<input.length; i=i+2) {
    //           rovers.push(rover.createRover(input[i]));
    //         }
    //         return rovers;
    //       };

    //       const listDirections = (input) => {
    //         const directions = [];
    //         input = input.split('\n');
    //         for (let i=1; i<input.length; i=i+2) {
    //           directions.push(input[i+1]);
    //         }
    //         return directions;
    //       };

    //       const processOutput = (rovers) => {
    //         let resultString = '';
    //         rovers.forEach(rover => {
    //           resultString += `${rover.position.x} ${rover.position.y} ${rover.orientation}\n`;
    //         });
    //         return resultString;
    //       };
    //       //Functions that transform the string with location and orientation of rover to rover object:
    //       //function to create rover objects
    //       const getLocationValues = (startPos) => {
    //         const locationValues = {};
    //         locationValues.x = parseInt(startPos.split(' ')[0]);
    //         locationValues.y = parseInt(startPos.split(' ')[1]);
    //         locationValues.orientation = startPos.split(' ')[2];
    //         return locationValues;
    //       };

    //       const createRover = (startPos) => {  
    //         const locationValues = getLocationValues(startPos);
    //         const rover = {
    //           position: {
    //             x: locationValues.x,
    //             y: locationValues.y,
    //           },
    //           orientation: locationValues.orientation,
    //         };

    //         return rover;
    //       };

    //       //Execute directions on one rover checking for collisions and out of bounds:
    //       //function to execute directions on one rover and check for collisions
    //       const executeDirections = (directions, rover, movedRoversArr) => {
    //         //deep clone the rover
    //         const movedRover = JSON.parse(JSON.stringify(rover));
    //         for (let i=0; i<directions.length; i++) {
    //           const orientation = movedRover.orientation;
    //           if (directions[i] === 'L') {
    //             //turn the movedRover left from the cardinal it is currently pointing at
    //             movedRover.orientation = cardinals[orientation]['L'];
    //           }
    //           if (directions[i] === 'R') {
    //             //turn the movedRover right from the cardinal it is currently pointing at
    //             movedRover.orientation = cardinals[orientation]['R'];
    //           }
    //           if (directions[i] === 'M') {
    //             //move movedRover forward according to current position
    //             movedRover.position = cardinals[orientation]['move'](movedRover.position.x, movedRover.position.y);
    //             failures.checkCollisions(movedRover.position.x, movedRover.position.y, movedRoversArr);
    //           }
    //         }
    //         return movedRover;
    //       };
    //       //Check for collisions and out of bounds:
    //       const checkCollisions = (x, y, movedRovers) => {
    //         if (movedRovers.length > 0) {
    //           for (let i=0; i<movedRovers.length; i++) {
    //             if (movedRovers[i].position.x === x && movedRovers[i].position.y === y) {
    //               throw 'collision detected with rover at position ' + i;
    //             }
    //           }
    //         }
    //       };

    //       const checkBounds = (movedRover, plateauBounds) => {
    //         if ((movedRover.position.x > plateauBounds.x || movedRover.position.x < 0)
    //             ||(movedRover.position.y > plateauBounds.y || movedRover.position.x < 0)) {
    //           return false;
    //         }
    //         return true;
    //       };

    // }
}

export default MarsArea;