/**
 * @Description: 公共方法的出口
 * @Author: OceanH
 * @Date: 2023-09-05 10:45:34
 */

// 处理decimal(字符串类型浮点数相加)
export const decimalStringOperator = (op: string, ...decimals: string[]) => {
  const nums = Array.from(decimals, (str) => Number(str));
  const addDecimal = () => {
    let result = 0;
    for (const num of nums) {
      result += num;
    }
    return result.toFixed(2);
  };
  switch (op.toLowerCase()) {
    case 'add':
      return addDecimal();
    default:
      break;
  }
};
