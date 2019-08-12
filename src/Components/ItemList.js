import React from 'react';
import axios from 'axios'




export default class ItemList extends React.Component {
  constructor(props) {
    super(props);




    this.state = {
      items: [],
      list: [],
      listcopy: [],
      TimestampList: [],
      level: "",
      timestamp: "",
      result: ""

    }
    this.handleChangetimestamp = this.handleChangetimestamp.bind(this);
    this.handleChangelevel = this.handleChangelevel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit(event) {
    var index = 1;

    var elementfound = false;
    while (index < this.state.list.length) {

      if (this.state.list[index].level === this.state.level &&
        this.state.list[index].timeStamp === this.state.timestamp) {
        this.setState({ result: this.state.list[index].message });
        elementfound = true;
      }
      index++;
    }
    if (elementfound === false) {

      this.setState({ result: "no data found !" });
    }

    // console.log(this.state.result);
    event.preventDefault();
  }
  handleChangelevel(event) {
    this.setState({ level: event.target.value });


  }
  handleChangetimestamp(event) {
    this.setState({ timestamp: event.target.value });
  }
  componentDidMount() {

    axios.get('errors.json')

      .then(res => {
        const result = res.data.data;

        console.log('res:', result);
        // eslint-disable-next-line
        this.state.list[0] = result[0];

        this.setState({ listcopy: result });

        this.setState(this.state.listcopy);
        // console.log('copy:', this.state.listcopy);

        this.state.listcopy.forEach(element => {
          // console.log('stamp:', element.timeStamp);
          var index = this.state.TimestampList.indexOf(element.timeStamp);
          // console.log('index:', index);
          if (index === -1) {
            //  console.log('add:', element.timeStamp);
            this.state.TimestampList.push(element.timeStamp);
          }


        });



        this.setState(this.state.TimestampList);

        for (var index = 0; index < this.state.listcopy.length; index++) {

          var element = this.state.listcopy[index];
          console.log(element);
          var bool = false;
          var listindex = 0;

          while ((listindex < this.state.list.length) && (bool === false)) {
            if ((element.level === this.state.list[listindex].level)
              && (element.timeStamp === this.state.list[listindex].timeStamp)) {

              //     // eslint-disable-next-line
              this.state.list[listindex].message = this.state.list[listindex]
                .message + '\n\n' + element.message;
              this.state.listcopy.shift(element);
              bool = true;



            }

            listindex++;
          }
          if (bool === false) {

            this.state.list.push(element);

          }
          this.setState(this.state.list);

        };


        //  console.log('m:', this.state.listcopy.length);



      })

  }
  render() {
    return (
      <div style={{
        height: 500, width: 600, backgroundColor: "#757575", position: "absolute", left: 300, right: 150
      }}>
        <form onSubmit={this.handleSubmit}>
          <div style={{
            height: 500, width: 300, backgroundColor: "#757575", position: "absolute"
          }}>
            <div style={{ paddingTop: 100 }}>
              <label style={{ paddingRight: 25 }}>

                <select style={{ width: 120, height: 30 }} onChange={this.handleChangelevel}>
                  {<option key="0" value="" >Choose LEVEL:</option>}
                  <option id="1" key="Debug" value="Debug" >Debug</option>
                  <option key="Notice" value="Notice" >Notice</option>

                </select>
              </label>

              <label style={{ paddingLeft: 30 }}>

                <select style={{ width: 100, height: 30 }} onChange={this.handleChangetimestamp}>
                  <option key="0" value=""> Timestamp:</option>
                  {this.state.TimestampList.map(element =>
                    <option key={element} value={element}>{element}</option>

                  )}

                </select>
              </label>

              <div style={{ paddingTop: 70 }}>
                <input style={{ width: 100 }} type="submit" value="Submit" />
              </div>
            </div>
          </div>

          <div style={{
            height: 500, width: 400, backgroundColor: "#757575", position: "absolute", left: 300, right: "auto"
          }}>


            <h2>Message:</h2>
            <div>{this.state.result}
              {this.handleChangelevel.handleChangetimestamp}</div>

          </div>

        </form>
      </div>






    )

  }



}