import stylex from '@stylexjs/stylex';

export const classes = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    marginLeft: 10,
    padding: 15,
    borderRadius: 8,
    width: '30%',
    minWidth: 400,
  },

  title: {
    marginBottom: 10,
  },

  buttonsActions: {
    '& > button': {},
  },
  sidebarBody: {
    minHeight: 'calc(100% - 158px)',
  },
});
