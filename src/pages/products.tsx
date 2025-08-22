import React, { useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import {
  Button,
  Layout,
  Menu,
  theme,
  Card,
  Col,
  Row,
  Typography,
  Flex,
  Spin,
} from 'antd'
import {
  getProducts,
  getProductsLoading,
  loadProductsList,
} from '../store/products'
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook'
import { addToCart } from '../store/cart'

const { Meta } = Card
const { Header, Sider, Content } = Layout

const ProductsPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const dispatch = useAppDispatch()
  const products = useAppSelector(getProducts)
  const isLoading = useAppSelector(getProductsLoading)

  useEffect(() => {
    dispatch(loadProductsList())
  }, [dispatch])

  return (
    <Layout style={{ width: '100%', minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: 64,
            margin: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255,255,255,.2)',
            borderRadius: 8,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '24px',
            textAlign: 'center',
          }}
        >
          RTK-Cart
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', icon: <UserOutlined />, label: 'nav 1' },
            { key: '2', icon: <VideoCameraOutlined />, label: 'nav 2' },
            { key: '3', icon: <UploadOutlined />, label: 'nav 3' },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />
          <Typography.Title level={4} style={{ margin: 0, marginLeft: 12 }}>
            Магазин
          </Typography.Title>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {isLoading ? (
            <Flex
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spin size="large" />
            </Flex>
          ) : (
            <Row gutter={[20, 20]}>
              {products.map((product) => (
                <Col span={6} key={product.id}>
                  <Card
                    hoverable
                    style={{
                      width: '100%',
                      height: 480,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: 12,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                    cover={
                      <img
                        alt={product.title}
                        src={product.thumbnail}
                        style={{
                          height: 220,
                          objectFit: 'cover',
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                        }}
                      />
                    }
                  >
                    <Meta
                      title={product.title}
                      description={
                        <Flex vertical gap={8} style={{ minHeight: 140 }}>
                          <Typography.Text style={{ flex: 1 }}>
                            {product.description.length > 90
                              ? `${product.description.slice(0, 90)}...`
                              : product.description}
                          </Typography.Text>
                          <Typography.Text
                            style={{ fontWeight: 'bold', fontSize: 16 }}
                          >
                            {product.price}$
                          </Typography.Text>
                          <Button
                            type="primary"
                            block
                            onClick={() => dispatch(addToCart(product))}
                          >
                            Добавить в корзину
                          </Button>
                        </Flex>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Content>
      </Layout>
    </Layout>
  )
}

export default ProductsPage
