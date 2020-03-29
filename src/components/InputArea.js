import React, { Component } from 'react';
import MarsArea from './MarsArea';
import {
  Button,
  FormGroup,
  Form,
  Input, Row, Col, Container, CardBody, Card, CardHeader
} from "reactstrap";

class InputArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upperRightCoords: '',
      roversPosition: '',
      instructions: '',
      verticalMax: 1,
      horizontalMax: 1,
      currentX: 0,
      currentY: 0,
      currentDir: 'N',
      errorOccured: false,
      currentIndex: 0,
      instructionList: []
    }
  }

  onChangeHandle = (e) => {
    //console.log('tg..onChangeHandle2 this.state:', this.state, ' pos:', this.state.position);
    let { name, value } = e.target;
    //trim: başında sonundaki boşlukları siler
    value = value.toUpperCase().replace(' ', '');
    console.log('tg..value:', value);
    this.setState({
      [name]: value,
    });
    //console.log('tg..onChangeHandle1 this.state:', this.state, ' pos:', this.state.position);
  }

  turnLeft = () => {
    let currentDir = 'W';
    switch (this.state.currentDir) {
      case 'N':
        currentDir = 'W';
        console.log('to west');
        break;
      case 'E':
        currentDir = 'N';
        console.log('to North');
        break;
      case 'W':
        currentDir = 'S';
        console.log('to South');
        break;
      case 'S':
        currentDir = 'E';
        console.log('to East');
        break;
      default:
        console.log("wrong state direction:", this.state.currentDir);
        break;
    }
    this.setState({ currentDir });
    this.myLog('turnLeft');
  }

  myLog(text) {
    const info = {
      i: this.state.currentIndex,
      x: this.state.currentX,
      y: this.state.currentY,
      dir: this.state.currentDir
    };
    console.log(text, info);
  }

  turnRight = () => {
    let currentDir = 'W';
    switch (this.state.currentDir) {
      case 'N':
        currentDir = 'E';
        console.log('to East');
        break;
      case 'E':
        currentDir = 'S';
        console.log('to South');
        break;
      case 'W':
        currentDir = 'N';
        console.log('to North');
        break;
      case 'S':
        currentDir = 'W';
        console.log('to West');
        break;
      default:
        console.log("wrong state direction:", this.state.currentDir);
        break;

    }
    this.setState({ currentDir });
    this.myLog('turnRight');
  }

  moveIt = () => {
    let currentX = this.state.currentX;
    let currentY = this.state.currentY;
    switch (this.state.currentDir) {
      case 'N':
        currentY++;
        console.log('gone North');
        break;
      case 'E':
        currentX++;
        console.log('gone East');
        break;
      case 'W':
        currentX--;
        console.log('gone West');
        break;
      case 'S':
        currentY--;
        console.log('gone South');
        break;
      default:
        console.log("wrong state direction:", this.state.currentDir);
        break;
    }
    if (currentY < 0 || currentY > this.state.verticalMax) {
      console.log('out of vertical boundary: ' + currentY + ' - ' + this.state.verticalMax);
      this.setState({ errorOccured: true });
      this.myLog('moveIt-OutofverticalMax');
      return;
    }
    if (currentX < 0 || currentX > this.state.horizontalMax) {
      console.log('out of horizontal boundary: ' + currentX + ' - ' + this.state.horizontalMax);
      this.setState({ errorOccured: true });
      this.myLog('moveIt-OutofhorizontalMax');
      return;
    }
    this.setState({ currentX, currentY });
    this.myLog('moveIt');
  }

  onSubmitHandle = (e) => {
    e.preventDefault();

    if (this.state.upperRightCoords.length !== 2) {
      alert('Max 2 single digits please');
      return;
    }
    if (! /^\d+$/.test(this.state.upperRightCoords)) {
      alert('Only numbers please');
      return;
    }
    const boundaries = this.state.upperRightCoords.split('');

    const horizontalMax = parseInt(boundaries[0]);
    const verticalMax = parseInt(boundaries[1]);
    if (horizontalMax < 1 || verticalMax < 1) {
      alert('Boundaries should be greater than zero');
      return;
    }

    let intPosition = this.state.roversPosition.split('');
    let currentX, currentY, currentDir;
    try {
      currentX = parseInt(intPosition[0]);
    } catch (err) {
      alert('initial horizontal positions should be a number');
      return;
    }
    if (currentX < 0 || currentX >= horizontalMax) {
      alert('initial horizontal position is out of boundaries');
      return;
    }
    try {
      currentY = parseInt(intPosition[1]);
    } catch (err) {
      alert('initial vertical positions should be a number');
      return;
    }
    if (currentY < 0 || currentY >= verticalMax) {
      alert('initial vertical position is out of boundaries');
      return;
    }
    currentDir = intPosition[2];
    if (['E', 'W', 'S', 'N'].indexOf(currentDir) < 0) {
      alert('initial direction should be E,W,S or N. Not ' + currentDir + ' please.');
      return;
    }
    const instructionList = this.state.instructions.split('');
    for (const instruction of instructionList) {
      if (['M', 'L', 'R'].indexOf(instruction) < 0) {
        alert('Instructions should be L,R or M. Not ' + instruction + ' please.');
        return;
      }
    }
    console.log('tg..veriler: hor:' + horizontalMax + ' ver:' + verticalMax + ' curX:' + currentX + ' curY:' + currentY + ' curDir:' + currentDir + ' insLis:' + instructionList)
    console.log('tg..before start this.state:', this.state)
    this.setState({ horizontalMax, verticalMax, currentX, currentY, currentDir, instructionList, currentIndex: 0, errorOccured: false });
    console.log('tg..before after this.state:', this.state)
    this.myLog('start');

    setTimeout(() => {
      this.run();
    }, 300); //1sn sonra, run'ı ilk kez çalıştır, currentIndex: 0, yani ilk komutu çalıştır


    //console.log('tg..funchandleSubmit-9 state:',this.state);
  }

  run() {
    this.myLog('run');
    let currentIndex = this.state.currentIndex;
    const instruction = this.state.instructionList[currentIndex];
    // LRMMMLLRRRMM
    switch (instruction) {
      case 'L':
        this.turnLeft();
        break;
      case 'R':
        this.turnRight();
        break;
      case 'M':
        this.moveIt()
        break;
      default:
        console.log("wrong instruction:", instruction);
        break;
    }

    //console.log('tg..funchandleSubmit-9 state:',this.state);
    if (this.state.errorOccured) {
      console.log('hata oldu, dışarıya çıktı');
      return;
    }
    currentIndex++; // bir sonraki komuta geç
    if (currentIndex < this.state.instructionList.length) {
      this.setState({ currentIndex });
      setTimeout(() => {
        this.run();
      }, 300); //1sn sonra, run'ı tekrar çalıştır
    } else {
      console.log('komutlar bitti');
    }
  }

  render() {
    //console.log('tg..func-render state:', this.state, ' pos:', this.state.position)
    return (
      <div>
        <Container fluid>
          <Row>
            <Col className="order-xl-1" xl="6">
              <Card className="bg-primary shadow">
                <CardHeader className='bg-white border-10'>
                  <Row className='align-items-center'>
                    <Col xs='12'>
                      <h3 className='mb-0'> Mars Rover Project </h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmitHandle}>

                    <FormGroup>
                      <label
                        htmlFor="upperRightCoords"
                        className="form-control-label"><h5>Upper Right Coordinates:</h5></label>
                      <Input
                        name="upperRightCoords"
                        id="upperRightCoords"
                        type='text'
                        maxLength={2}
                        required
                        //      defaultValue={'55'}
                        value={this.state.upperRightCoords}
                        onChange={this.onChangeHandle} />
                    </FormGroup>
                    <FormGroup>
                      <label
                        htmlFor="roversPosition"
                        className="form-control-label"><h5>Rover's Position:</h5></label>
                      <Input
                        name="roversPosition"
                        id="roversPosition"
                        type='text'
                        value={this.state.roversPosition}
                        onChange={this.onChangeHandle} />
                    </FormGroup>
                    <FormGroup>
                      <label
                        htmlFor="instructions"
                        className="form-control-label"><h5>Series Of instructions:</h5></label>
                      <Input
                        name="instructions"
                        id="instructions"
                        type='text'
                        value={this.state.instructions}
                        onChange={this.onChangeHandle} />
                    </FormGroup>
                    <Button type="submit" color="success" size="lg" onClick={this.onSubmitHandle}>Submit</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <MarsArea state={this.state} />
      </div >
    );
  }
}

export default InputArea;