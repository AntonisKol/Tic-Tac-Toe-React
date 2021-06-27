



export function calculateWinner(squares) {

    const lines = [ // This lookup array includes all the winning combinations
      [0, 1, 2],//123
      [3, 4, 5],//456
      [6, 7, 8],//789
      [0, 3, 6],//174
      [1, 4, 7],//258
      [2, 5, 8],//369
      [0, 4, 8],//159
      [2, 4, 6] //753
    ];


    for (let i = 0; i < lines.length; i++) { 
      const [a, b, c] = lines[i];//destructures the values of lines and gives them names. [a,b,c] become are the indexes(winning moves).
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {//we check if there is a player move(X or O)on first position. If not we don't continue and return null. Otherwise we check if the first value equals to the second and the first to the third. If these match we have a winner.
        return squares[a];
      }
    }
    return null;
  }
  
  const squares = [  //Test 
    null, null, null,
    'X', 'X', 'O',
    null, null, null
  ];
  
  console.log(calculateWinner(squares));