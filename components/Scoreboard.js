class Scoreboard extends React.Component {
  render() {
    return (
      <table className="scoreboard">
        <tr>
          <td> <input type="text" name="name" placeholder="player 1" /> </td>
          <td width="30"> &nbsp; </td>
          <td> <input type="text" name="name" placeholder="player 2" /> </td>
        </tr>
        <tr>
          <td className="score X">
            {this.props.score.X}
          </td>
          <td> &nbsp; </td>
          <td className="score O">
            {this.props.score.O}
          </td>
        </tr>
      </table>
    )
  }
}
