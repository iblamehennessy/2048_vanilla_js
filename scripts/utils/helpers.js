function transpose(matrix){
    return matrix[0].map((_, c) => matrix.map(row => row[c]));
}