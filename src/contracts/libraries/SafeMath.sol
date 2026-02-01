// SPDX-License-Identifier:MIT

pragma solidity ^0.8.21;

library SafeMath {
    // suma
    function add(uint256 x, uint256 y) internal pure returns(uint256){
        uint256 r = x + y;
        require(r >= x, 'SafeMath: addition overflow');
        return r;
    }

    function sub(uint256 x, uint256 y) internal pure returns(uint256){
        require(y < x, 'SafeMath: subtraction overflow');
        uint256 r = x - y;
        return r;
    }

    // optimizar uso de gas en multiplicacion
    function mul(uint256 x, uint256 y) internal pure returns(uint256){
        // Optizacion para 0
        if (x == 0){
            return 0;
        }

        uint256 r = x * y;
        require(r / x == y, 'SafeMath: multiplication overflow');
        return r;
    }

    function div(uint256 x, uint256 y) internal pure returns(uint256){
        require(y > 0, 'SafeMath: division by zero');

        uint256 r = x / y;
        return r;
    }

    function mod(uint256 x, uint256 y) internal pure returns(uint256){
        require(y != 0, 'SafeMath: modulo by zero');
        return x % y;
    }
}