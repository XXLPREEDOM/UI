import components from './src/index'

export * from './src/index'


export default {
    install: app => components.forEach(component => app.use(component))
}