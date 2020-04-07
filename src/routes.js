import {
    createAppContainer,
    createStackNavigator,
    createDrawerNavigator,
} from 'react-navigation';

// import Main from '~/pages/Main';
import Document from '~/pages/Document';
import ViewDocument from '~/pages/Document/View';
import FormDocument from '~/pages/Document/Form';
import DocumentDetail from '~/pages/Document/Detail';

import Customer from '~/pages/Customer';
import CustomerView from '~/pages/Customer/View';
import AdresseView from '~/pages/Adresse/View';
import Contact from '~/pages/Contact';
import ContactForm from '~/pages/Contact/Form';
import ContactView from '~/pages/Contact/View';
import Product from '~/pages/Product';
import ProductView from '~/pages/Product/View';
import Auth from '~/pages/Auth';
import Sync from '~/pages/Sync';
import Reset from '~/pages/Reset';
import Presentation from '~/pages/Presentation';
import RelationshipForm from '~/pages/Relationship/Form';

const headerStyle = { height: 40 };
const headerTintColor = '#555';
const headerTitleStyle = { fontSize: 16, textAlign: "center", flex: 1 };

const ContactFormScreen = createStackNavigator({
    ContactForm: {
        screen: ContactForm,
        navigationOptions: () => ({
            title: 'Formulário de contacto',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const RelationshipFormScreen = createStackNavigator({
    RelationshipForm: {
        screen: RelationshipForm,
        navigationOptions: () => ({
            title: 'Formulário de relacionamentos',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const CustomerViewScreen = createStackNavigator({
    CustomerView: {
        screen: CustomerView,
        navigationOptions: () => ({
            title: 'Detalhes do Cliente',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const AdresseViewScreen = createStackNavigator({
    AdresseView: {
        screen: AdresseView,
        navigationOptions: () => ({
            title: 'Detalhes do Endereço',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const DocumentFormScreen = createStackNavigator({
    FormDocument: {
        screen: FormDocument,
        navigationOptions: () => ({
            title: 'Editar Encomenda',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const DocumentViewScreen = createStackNavigator({
    ViewDocument: {
        screen: ViewDocument,
        navigationOptions: () => ({
            title: 'Detalhes da Encomenda',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const DocumentDetailScreen = createStackNavigator({
    DocumentDetail: {
        screen: DocumentDetail,
        navigationOptions: () => ({
            title: 'Detalhes da Encomenda',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const DocumentScreen = createStackNavigator({
    Document: {
        screen: Document,
        navigationOptions: () => ({
            title: 'Consulta de Encomendas',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const CustomerScreen = createStackNavigator({
    Customer: {
        screen: Customer,
        navigationOptions: () => ({
            title: 'Consulta de Clientes',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const ContactScreen = createStackNavigator({
    Contact: {
        screen: Contact,
        navigationOptions: () => ({
            title: 'Consulta de Contactos',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const ProductScreen = createStackNavigator({
    Product: {
        screen: Product,
        navigationOptions: () => ({
            title: 'Consulta de Artigos',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const ProductViewScreen = createStackNavigator({
    ProductView: {
        screen: ProductView,
        navigationOptions: () => ({
            title: 'Detalhes do Artigo',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const ContactViewScreen = createStackNavigator({
    ContactView: {
        screen: ContactView,
        navigationOptions: () => ({
            title: 'Detalhes do Contacto',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const SyncScreen = createStackNavigator({
    Sync: {
        screen: Sync,
        navigationOptions: () => ({
            title: 'Sincronização',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const ResetScreen = createStackNavigator({
    Reset: {
        screen: Reset,
        navigationOptions: () => ({
            title: 'Redefinir Aplicação',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const PresentationScreen = createStackNavigator({
    Presentation: {
        screen: Presentation,
        navigationOptions: () => ({
            title: 'Apresentação',
            headerStyle,
            headerTintColor,
            headerTitleStyle,
        }),
    },
});

const AppNavigator = createDrawerNavigator({
    Auth: {
        screen: Auth,
        navigationOptions: {
            title: 'Login',
            drawerLockMode: 'locked-closed',
        }
    },
    PresentationScreen: {
        screen: PresentationScreen,
        navigationOptions: {
            title: 'Apresentação',
        }
    },
    SyncScreen: {
        screen: SyncScreen,
        navigationOptions: {
            title: 'Sincronização',
        }
    },
    ProductScreen: {
        screen: ProductScreen,
        navigationOptions: {
            title: 'Artigos',
        }
    },
    CustomerScreen: {
        screen: CustomerScreen,
        navigationOptions: {
            title: 'Clientes',
        }
    },
    ContactScreen: {
        screen: ContactScreen,
        navigationOptions: {
            title: 'Contactos',
        }
    },
    DocumentScreen: {
        screen: DocumentScreen,
        navigationOptions: {
            title: 'Documentos',
        }
    },
    DocumentFormScreen: {
        screen: DocumentFormScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    DocumentViewScreen: {
        screen: DocumentViewScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    CustomerViewScreen: {
        screen: CustomerViewScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    AdresseViewScreen: {
        screen: AdresseViewScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    ProductViewScreen: {
        screen: ProductViewScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    ContactViewScreen: {
        screen: ContactViewScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    RelationshipFormScreen: {
        screen: RelationshipFormScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    ContactFormScreen: {
        screen: ContactFormScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    DocumentDetailScreen: {
        screen: DocumentDetailScreen,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    ResetScreen: {
        screen: ResetScreen,
        navigationOptions: {
            title: 'Redefinir Aplicação',
        }
    },
},
    {
        initialRouteName: "Auth"
    });

const Routes = createAppContainer(AppNavigator);
export default Routes;
