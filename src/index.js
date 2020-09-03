import ReactDOM from 'react-dom';
import './index.css';
import React from 'react';
import { Flowpoint, Flowspace } from 'flowpoints';
function Border1(props) {
    return (
      <div className="box3">
        {props.children}
      </div>
    );
  }
function Border2(props) {
    return (
      <div className="box5">
        {props.children}
      </div>
    );
  }
class SubTopic extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'Write your subtopic here!'
          };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    render(){
        return(
        <Border2>
            <div　className="clearfix">
            <div className="left">
            <p>{this.props.topicnum}{"-"}{this.props.num}</p>
            <textarea className="textarea2" value={this.state.value} onChange={this.handleChange} rows="8"/>
            </div>
            <div className="right">
            <CommentLine></CommentLine>
            </div>
            </div>
        </Border2>
        )
    }
}
class Topic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'Write your topic here!',
            numofsubtopics:0,
            show:true,
          };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    addsubtopic() {
        this.setState({
          numofsubtopics:this.state.numofsubtopics+1,
        });
        const id = "showorhide"+this.props.num;
        document.getElementById(id).style.display ="block";
        this.setState({show:true});
    }
    rendersubtopic(i){
        return(
            <SubTopic
            key = {i}
            num = {i}
            topicnum ={this.props.num}/>
        )
    }
    switch(){
        const id = "showorhide"+this.props.num;
        if (this.state.show){
            document.getElementById(id).style.display ="none";
        }else{
            document.getElementById(id).style.display ="block";

        }
        this.setState({show:!this.state.show});
    }
    render(){
        var numarray = new Array(this.state.numofsubtopics);
        for (var i=0;i<this.state.numofsubtopics;i++){
            numarray[i] = i+1;
        }
        return(
            <Border1>
            <div>
            <p>{this.props.num}</p>
            <textarea　className="textarea1" value={this.state.value} onChange={this.handleChange} rows="8" />
            <div　id={"showorhide"+this.props.num}>
            <ol type="A">
                    {numarray.map((number) => this.rendersubtopic(number))}
            </ol>
            </div>
            <button onClick={() => this.switch()}>{this.state.show ? "hide△":"show▽"}</button>
            <button onClick={() => this.addsubtopic()}>Add Subtopic</button>
            </div>
            </Border1>
        );
    };
}

class Minute extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numoftopics:1,
            topics: [
                {
                  topicvalues: Array(100).fill(null)
                }
              ],
         };
      
    }
    renderTopic(i){
        return(
            <Topic
            key = {i}
            num = {i}/>
        )
    }
    createtopic() {
        this.setState({
          numoftopics:this.state.numoftopics+1,
        });

      }
    
    render() {
        var numarray = new Array(this.state.numoftopics);
        for (var i=0;i<this.state.numoftopics;i++){
            numarray[i] = i+1;
        }
        
        return(
            <div>
            <div>
                <div className="header">
                <button onClick={() => this.createtopic()}>create a new topic</button>
                </div>
                <div>
                    <h1>Take the minute of your meeting!</h1>
                </div>
                <ol type="A">
                    {numarray.map((number) => this.renderTopic(number))}
                </ol>
            </div>
            <div>
            <Flowspace>
            <Flowpoint key="point_a" outputs={["point_b"]}>
              Hello world
              ...
            </Flowpoint>
            <Flowpoint key="point_b">
              I am point b
              ...
            </Flowpoint>
          </Flowspace>
          </div>
          </div>
        );
    };
};

class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            liked:0,};
    }
    pressLike(){
        this.setState({
            liked:this.state.liked+1,
        })
    }
    nonDisplay(){
        
    }
    render(){
        return (
        <div className="comment">
        <div className="body-container">
          <div className="status-display">
            <span className="display-name">{this.props.displayName}</span>
          </div>
          <div className="content">{this.props.content}</div>
          <div className="status-action">
          <span onClick={() => this.pressLike()}>{this.state.liked > 0 ? '❤️×'+this.state.liked : '♡'}</span>
          </div>
          </div>
          
       </div>
        );
    };
  }
class CommentLine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments : [ ],
            currentcontent:"",
            currentname:"",
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }
    handleChange1(event) {
        this.setState({currentcontent: event.target.value});
    }
    handleChange2(event) {
        this.setState({currentname: event.target.value});
    }
    sendComment(){
        if(this.state.currentcontent) {
            if (this.state.currentname == ""){
                this.setState({
                    comments :this.state.comments.concat([<Comment content={this.state.currentcontent} displayName="Anonymous" ></Comment>]),
                })
            }else{
                this.setState({
                comments :this.state.comments.concat(<Comment content={this.state.currentcontent} displayName={this.state.currentname} ></Comment>),
            })
            }    
        }
        this.setState({
            currentname: "",
            currentcontent:"",
        });
    }
    render(){
        return(
            <div>
            <div>名前：<textarea className="comment-textarea" value={this.state.currentname} onChange={this.handleChange2}　rows="1" cols="10"></textarea></div>
            <div>コメント：<textarea className="comment-textarea" value={this.state.currentcontent} onChange={this.handleChange1}　rows="1" cols="60" ></textarea></div>
            <div><button onClick={()=>this.sendComment()} className="send-comment">Add Comment</button></div>
            <div className="scroll">
                 {this.state.comments}
            </div>
            </div>
        );
    }

}
ReactDOM.render(
    <Minute />,
    document.getElementById('root')
  );