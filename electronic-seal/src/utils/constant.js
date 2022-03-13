// 解决状态
export const resolveStatus = {
  0: '未解决',
  1: '解决中',
  2: '已解决',
};

// tag对应状态颜色
export const statusColor = {
  0: 'danger',
  1: 'warning',
  2: 'info',
};

// tag对应等级颜色
export const levelColor = {
  0: 'danger',
  1: 'warning',
  2: 'info',
  3: '',
  4: 'success',
};

// loading动画需要的svg
export const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
