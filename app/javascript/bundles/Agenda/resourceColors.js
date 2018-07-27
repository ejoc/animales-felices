export const colors = ['#cf1322', '#8c8c8c', '#1890ff', '#7cb305', '#cf1322']

const getAvatarColor = id => colors[(id % colors.length)]

export default getAvatarColor
