// withAuthentication.tsx
import React from 'react';
import { GetAuthCurrentUser } from '@/utils/utils';
import { useRouter } from 'next/navigation';

const withAuthentication = (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => {
        const router = useRouter();
        const checkAuth = async () => {
            const signedUser = await GetAuthCurrentUser();

            if (!signedUser) {
                router.push('/auth');
                return null; // Return null if redirecting
            }

            return <WrappedComponent {...props} />;
        };

        return <>{checkAuth()}</>;
    };
};

export default withAuthentication;
