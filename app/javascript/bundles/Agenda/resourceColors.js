export const colors = ['#cf1322', '#8c8c8c', '#0050b3', '#7cb305', '#cf1322']

const getAvatarColor = id => colors[(id % colors.length)]

export default getAvatarColor
