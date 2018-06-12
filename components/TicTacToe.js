class TicTacToe extends React.Component {

    constructor() {
        super();
        this.state = {
            grid_size: 3
        };
    }

    /*
     * Initialize the game
     */
    init() {
        // pocet tahov
        this.moves = 0;

        this.setState({
            // skore hracov
            score: {
                X: 0,
                O: 0
            },

            data: {}
        });
    }


    /*
     * vycisti board
     */
    empty() {
        // vynuluje tahy
        this.moves = 0;
        // vynuluje data
        this.setState({data: {}});
    }


    /*
     * oznaci urcity stlpec
     */
    mark(row_index, col_index) {

        // Return If already marked
        if (this.state.data[row_index + '' + col_index]) {
            return;
        }

        // zvysi pocet tahov
        this.moves++;

        // sucasna znacka "X" or "O" na zaklade poctu tahov
        var current_mark = this.moves % 2 === 1
            ? 'X'
            : 'O';

        // priradi mark data do data object
        this.setState({
            data: {
                ...this.state.data,
                [row_index + '' + col_index]: current_mark
            }
        });

        setTimeout(() => {

            // kontrola ci vyhral
            if (this.didWin(current_mark)) {
                alert(current_mark + " has won");
                this.setState({
                    score: {
                        ...this.state.score,
                        [current_mark]: this.state.score[current_mark] + 1
                    }
                });
                this.empty();
            }
            // ci je remiza
            else if (this.moves == Math.pow(this.state.grid_size, 2)) {
                alert("It's a draw !");
                this.empty();
            }
        }, 200);
    }

    // kontrola ci vyhral hrac so sucasnou znackou
    didWin(mark) {

        // premenne na vypocet znacky
        var vertical_count = 0,
            horizontal_count = 0,
            right_to_left_count = 0,
            left_to_right_count = 0;

        // Loop 1
        for (var i = 0; i < this.state.grid_size; i++) {


            vertical_count = 0;
            horizontal_count = 0;

            // Loop 2
            for (var j = 0; j < this.state.grid_size; j++) {


                if (this.state.data[i + '' + j] == mark) {
                    horizontal_count++;
                }


                if (this.state.data[j + '' + i] == mark) {
                    vertical_count++;
                }

            }


            if (this.state.data[i + '' + i] == mark) {
                left_to_right_count++;
            }


            if (this.state.data[(this.state.grid_size - 1 - i) + '' + i] == mark) {
                right_to_left_count++;
            }

            // ak suhlasi vyhral
            if (horizontal_count == this.state.grid_size || vertical_count == this.state.grid_size) {
                return true;
            }

        }

        // ak suhlasi diagonal vyhral
        if (left_to_right_count == this.state.grid_size || right_to_left_count == this.state.grid_size) {
            return true;
        }

        // nikto nevyhral
        return false;
    }



    componentWillMount() {
        this.init();
    }


    render() {
        return (
            <div className="tic-tac-toe">

                <Scoreboard score={this.state.score}/>

                <Board data={this.state.data} grid_size={this.state.grid_size} mark={this.mark.bind(this)}/>

                <div>
                    <button onClick={this.empty.bind(this)}>
                        Reset
                    </button>

                </div>

            </div>



        )
    }
}



ReactDOM.render(<TicTacToe/>, document.getElementById("app"));
ReactDOM.render(<TicTacToe/>, document.getElementById("app2"));
