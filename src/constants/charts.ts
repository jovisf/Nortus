export const CHART_COLORS = {
  primary: '#43D2CB',
  conversion: '#75DFFF',
  white: '#FFFFFF',
  axisBorder: 'rgba(255, 255, 255, 0.25)',
  gridBorder: 'rgba(255, 255, 255, 0.25)',
};

export const CHART_COMMON_OPTIONS = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: {
      enabled: true,
      easing: 'easeinout' as const,
      speed: 800,
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: CHART_COLORS.white,
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      },
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: CHART_COLORS.white,
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      },
    },
  },
  grid: {
    borderColor: CHART_COLORS.gridBorder,
    strokeDashArray: 0,
    xaxis: {
      lines: { show: false },
    },
    yaxis: {
      lines: { show: true },
    },
  },
  tooltip: {
    theme: 'dark' as const,
  },
};
