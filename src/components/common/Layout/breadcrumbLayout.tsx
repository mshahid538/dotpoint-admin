import React, { ReactNode } from 'react';
 import Layout from './layout';
import Breadcrumb from '../breadcump';

interface BreadcrumbLayoutProps {
  children: ReactNode;
  breadcrumb: any;
  breadcrumbTitle: string;
  description?: string;
}

const BreadcrumbLayout: React.FC<BreadcrumbLayoutProps> = ({
  children,
  breadcrumb,
  breadcrumbTitle,
  description,
}) => {
  return (
    <Layout>
      <Breadcrumb
        breadcrumb={breadcrumb}
        title={breadcrumbTitle}
        description={description}
      />
      <>{children}</>
    </Layout>
  );
};

export default BreadcrumbLayout;
