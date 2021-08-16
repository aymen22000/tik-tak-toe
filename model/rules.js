module.exports.winning = function(grid, player){
    if(player){
        if((grid[0]==grid[1]==grid[2])||(grid[3]==grid[4]==grid[5])||(grid[6]==grid[7]==grid[8])){
            return 1;
        }
        else if((grid[0]==grid[3]==grid[6])||(grid[1]==grid[4]==grid[7])||(grid[2]==grid[5]==grid[8])){
            return 1;
        }
        else if((grid[0]==grid[4]==grid[8])||(grid[2]==grid[4]==grid[6])){
            return 1;
        }
    }else if(!player){
        if((grid[0]==grid[1]==grid[2])||(grid[3]==grid[4]==grid[5])||(grid[6]==grid[7]==grid[8])){
            return 2;
        }
        else if((grid[0]==grid[3]==grid[6])||(grid[1]==grid[4]==grid[7])||(grid[2]==grid[5]==grid[8])){
            return 2;
        }
        else if((grid[0]==grid[4]==grid[8])||(grid[2]==grid[4]==grid[6])){
            return 2;
        }
    }else{
        return 0;
    }
};