import React from 'react'
import { Menu } from 'antd'

const MenuChart = ({ periodicity, onPeriodicityChange }) => (
  <Menu mode="horizontal" selectedKeys={[periodicity]} onClick={onPeriodicityChange}>
    <Menu.Item key="week">Semana</Menu.Item>
    <Menu.Item key="month">Mes</Menu.Item>
    <Menu.Item key="year">Año</Menu.Item>
  </Menu>
)

export default MenuChart
