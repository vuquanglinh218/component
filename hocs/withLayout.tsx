import React, { ComponentType } from 'react';
import Layout, { LayoutProps } from '../components/layouts/Layout';

//unused yet, there seems be no way to pass getServerSideProps to HOC
export function withLayout(props: LayoutProps) {
  return function <P>(Component: ComponentType<P>) {
    return class ComponentWithLayout extends React.Component<P & LayoutProps> {
      render() {
        const { title, classes, marginLeftRight, hiddenContract, username } = props;
        debugger;
        return (
          <Layout {...{ title, classes, marginLeftRight, hiddenContract, username }}>
            <Component {...this.props} />
          </Layout>
        );
      }
    };
  };
}
