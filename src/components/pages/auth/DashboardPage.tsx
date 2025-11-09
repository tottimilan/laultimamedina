'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const WelcomeSection = styled.div``;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LogoutButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  overflow-x: auto;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  background: transparent;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-bottom: 2px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : 'transparent'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ItemCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const ItemImage = styled.div`
  position: relative;
  width: 100px;
  height: 75px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.tertiary};
`;

const ItemContent = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ItemMeta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const RemoveButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.status.error};
    color: ${({ theme }) => theme.colors.status.error};
  }
`;

const DonationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const DonationCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DonationInfo = styled.div``;

const DonationAmount = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.primary};
`;

const DonationDate = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const DonationType = styled.span<{ $type: string }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ $type, theme }) => 
    $type === 'monthly' ? theme.colors.brand.secondary : theme.colors.background.tertiary};
  color: ${({ $type, theme }) => 
    $type === 'monthly' ? theme.colors.brand.dark : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.sm};
  margin-left: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SubscriptionCard = styled.div`
  background: ${({ theme }) => theme.colors.brand.primary}10;
  border: 2px solid ${({ theme }) => theme.colors.brand.primary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

type TabType = 'activity' | 'favorites' | 'donations' | 'subscription' | 'profile';

export default function DashboardPage() {
  const locale = useLocale();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>('activity');
  const [favorites, setFavorites] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${locale}/login`);
    }
  }, [status, router, locale]);

  useEffect(() => {
    if (session?.user) {
      loadUserData();
    }
  }, [session]);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      // Cargar favoritos
      const favRes = await fetch('/api/user/favorites');
      if (favRes.ok) {
        const favData = await favRes.json();
        setFavorites(favData.favorites || []);
      }

      // Cargar historial
      const histRes = await fetch('/api/user/history');
      if (histRes.ok) {
        const histData = await histRes.json();
        setHistory(histData.history || []);
      }

      // Cargar donaciones
      const donRes = await fetch('/api/user/donations');
      if (donRes.ok) {
        const donData = await donRes.json();
        setDonations(donData.donations || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    try {
      await fetch(`/api/user/favorites/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setFavorites(favorites.filter(f => f.id !== id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm(locale === 'es' ? '¿Estás seguro de cancelar tu donación mensual?' : 'Are you sure you want to cancel your monthly donation?')) {
      return;
    }

    try {
      const response = await fetch('/api/user/subscription/cancel', {
        method: 'POST',
      });

      if (response.ok) {
        alert(locale === 'es' ? 'Suscripción cancelada' : 'Subscription canceled');
        loadUserData();
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <MainLayout>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            {locale === 'es' ? 'Cargando...' : locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </div>
        </Container>
      </MainLayout>
    );
  }

  if (!session) return null;

  const tabs: { id: TabType; label: string }[] = [
    { id: 'activity', label: locale === 'es' ? 'Mi Actividad' : locale === 'ar' ? 'نشاطي' : 'My Activity' },
    { id: 'favorites', label: locale === 'es' ? 'Favoritos' : locale === 'ar' ? 'المفضلة' : 'Favorites' },
    { id: 'donations', label: locale === 'es' ? 'Donaciones' : locale === 'ar' ? 'التبرعات' : 'Donations' },
    { id: 'subscription', label: locale === 'es' ? 'Suscripción' : locale === 'ar' ? 'الاشتراك' : 'Subscription' },
    { id: 'profile', label: locale === 'es' ? 'Perfil' : locale === 'ar' ? 'الملف الشخصي' : 'Profile' },
  ];

  return (
    <MainLayout>
      <Container>
        <Header>
          <WelcomeSection>
            <Title>
              {locale === 'es' ? '¡Bienvenido, ' : locale === 'ar' ? 'مرحبًا، ' : 'Welcome, '}
              {session.user?.name || session.user?.email}!
            </Title>
            <Subtitle>
              {locale === 'es' ? 'Gestiona tu cuenta y actividad' : locale === 'ar' ? 'إدارة حسابك ونشاطك' : 'Manage your account and activity'}
            </Subtitle>
          </WelcomeSection>
          <LogoutButton onClick={() => signOut({ callbackUrl: `/${locale}` })}>
            {locale === 'es' ? 'Cerrar Sesión' : locale === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
          </LogoutButton>
        </Header>

        <Tabs>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              $isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Tab>
          ))}
        </Tabs>

        <TabContent>
          {/* MI ACTIVIDAD */}
          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SectionTitle>
                {locale === 'es' ? 'Contenido Visto Recientemente' : locale === 'ar' ? 'المحتوى المشاهد مؤخرًا' : 'Recently Viewed Content'}
              </SectionTitle>
              {history.length > 0 ? (
                <Grid>
                  {history.slice(0, 12).map((item) => (
                    <Link key={item.id} href={`/${locale}/${item.contentType}/${item.contentId}`} style={{ textDecoration: 'none' }}>
                      <ItemCard>
                        <ItemImage>
                          {item.thumbnail && (
                            <Image
                              src={item.thumbnail}
                              alt={item.contentTitle}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          )}
                        </ItemImage>
                        <ItemContent>
                          <ItemMeta>{item.contentType}</ItemMeta>
                          <ItemTitle>{item.contentTitle}</ItemTitle>
                          {item.progress > 0 && (
                            <div style={{ marginTop: '0.5rem' }}>
                              <div style={{ 
                                height: '4px', 
                                background: '#eef1f0', 
                                borderRadius: '2px',
                                overflow: 'hidden'
                              }}>
                                <div style={{ 
                                  height: '100%', 
                                  width: `${item.progress}%`, 
                                  background: '#0d5c47' 
                                }} />
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '0.25rem' }}>
                                {Math.round(item.progress)}% {locale === 'es' ? 'completado' : locale === 'ar' ? 'مكتمل' : 'complete'}
                              </div>
                            </div>
                          )}
                        </ItemContent>
                      </ItemCard>
                    </Link>
                  ))}
                </Grid>
              ) : (
                <EmptyState>
                  {locale === 'es' ? 'Aún no has visto ningún contenido' : locale === 'ar' ? 'لم تشاهد أي محتوى بعد' : 'You haven\'t viewed any content yet'}
                </EmptyState>
              )}
            </motion.div>
          )}

          {/* FAVORITOS */}
          {activeTab === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SectionTitle>
                {locale === 'es' ? 'Mis Favoritos' : locale === 'ar' ? 'مفضلاتي' : 'My Favorites'}
              </SectionTitle>
              {favorites.length > 0 ? (
                <Grid>
                  {favorites.map((item) => (
                    <ItemCard key={item.id}>
                      <ItemImage>
                        {/* Placeholder image */}
                      </ItemImage>
                      <ItemContent>
                        <ItemMeta>{item.contentType}</ItemMeta>
                        <ItemTitle>{item.contentTitle}</ItemTitle>
                        <RemoveButton onClick={() => handleRemoveFavorite(item.id)}>
                          {locale === 'es' ? 'Quitar' : locale === 'ar' ? 'إزالة' : 'Remove'}
                        </RemoveButton>
                      </ItemContent>
                    </ItemCard>
                  ))}
                </Grid>
              ) : (
                <EmptyState>
                  {locale === 'es' ? 'No tienes favoritos guardados' : locale === 'ar' ? 'ليس لديك مفضلات محفوظة' : 'You don\'t have any saved favorites'}
                </EmptyState>
              )}
            </motion.div>
          )}

          {/* DONACIONES */}
          {activeTab === 'donations' && (
            <motion.div
              key="donations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SectionTitle>
                {locale === 'es' ? 'Historial de Donaciones' : locale === 'ar' ? 'سجل التبرعات' : 'Donation History'}
              </SectionTitle>
              {donations.length > 0 ? (
                <DonationsList>
                  {donations.map((donation) => (
                    <DonationCard key={donation.id}>
                      <DonationInfo>
                        <DonationAmount>
                          {donation.amount}€
                          <DonationType $type={donation.type}>
                            {donation.type === 'monthly' 
                              ? (locale === 'es' ? 'mensual' : locale === 'ar' ? 'شهري' : 'monthly')
                              : (locale === 'es' ? 'única' : locale === 'ar' ? 'مرة واحدة' : 'one-time')}
                          </DonationType>
                        </DonationAmount>
                        <DonationDate>
                          {new Date(donation.createdAt).toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'ar' ? 'ar-SA' : 'en-US')}
                        </DonationDate>
                        {donation.matchGiftCompany && (
                          <div style={{ fontSize: '0.875rem', color: '#0d5c47', marginTop: '0.5rem' }}>
                            Match Gift: {donation.matchGiftCompany}
                          </div>
                        )}
                      </DonationInfo>
                      <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                        {donation.status === 'succeeded' ? '✓' : donation.status}
                      </div>
                    </DonationCard>
                  ))}
                  
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8faf9', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0d5c47', marginBottom: '0.5rem' }}>
                      {donations.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}€
                    </div>
                    <div style={{ color: '#4a5568' }}>
                      {locale === 'es' ? 'Total donado' : locale === 'ar' ? 'إجمالي التبرعات' : 'Total donated'}
                    </div>
                  </div>
                </DonationsList>
              ) : (
                <EmptyState>
                  {locale === 'es' ? 'Aún no has realizado donaciones' : locale === 'ar' ? 'لم تقم بأي تبرعات بعد' : 'You haven\'t made any donations yet'}
                  <div style={{ marginTop: '1rem' }}>
                    <Link href={`/${locale}/donate`} style={{ color: '#0d5c47', textDecoration: 'underline' }}>
                      {locale === 'es' ? 'Hacer mi primera donación' : locale === 'ar' ? 'قم بأول تبرع' : 'Make my first donation'}
                    </Link>
                  </div>
                </EmptyState>
              )}
            </motion.div>
          )}

          {/* SUSCRIPCIÓN */}
          {activeTab === 'subscription' && (
            <motion.div
              key="subscription"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SectionTitle>
                {locale === 'es' ? 'Gestionar Suscripción' : locale === 'ar' ? 'إدارة الاشتراك' : 'Manage Subscription'}
              </SectionTitle>
              
              {donations.some(d => d.type === 'monthly' && d.status === 'succeeded') ? (
                <SubscriptionCard>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    {locale === 'es' ? 'Donación Mensual Activa' : locale === 'ar' ? 'تبرع شهري نشط' : 'Active Monthly Donation'}
                  </h3>
                  <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
                    {locale === 'es' 
                      ? 'Gracias por tu apoyo continuo a La Última Medina' 
                      : locale === 'ar'
                      ? 'شكرًا لدعمك المستمر للمدينة الأخيرة'
                      : 'Thank you for your continued support of La Última Medina'}
                  </p>
                  <button
                    onClick={handleCancelSubscription}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'transparent',
                      border: '1px solid #e53e3e',
                      color: '#e53e3e',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    {locale === 'es' ? 'Cancelar Suscripción' : locale === 'ar' ? 'إلغاء الاشتراك' : 'Cancel Subscription'}
                  </button>
                </SubscriptionCard>
              ) : (
                <EmptyState>
                  {locale === 'es' ? 'No tienes una suscripción mensual activa' : locale === 'ar' ? 'ليس لديك اشتراك شهري نشط' : 'You don\'t have an active monthly subscription'}
                  <div style={{ marginTop: '1rem' }}>
                    <Link href={`/${locale}/sustain`} style={{ color: '#0d5c47', textDecoration: 'underline' }}>
                      {locale === 'es' ? 'Convertirme en sustainer' : locale === 'ar' ? 'كن داعمًا شهريًا' : 'Become a sustainer'}
                    </Link>
                  </div>
                </EmptyState>
              )}
            </motion.div>
          )}

          {/* PERFIL */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SectionTitle>
                {locale === 'es' ? 'Mi Perfil' : locale === 'ar' ? 'ملفي الشخصي' : 'My Profile'}
              </SectionTitle>
              <div style={{ background: 'white', border: '1px solid #e5e8e7', borderRadius: '0.5rem', padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong>{locale === 'es' ? 'Nombre:' : locale === 'ar' ? 'الاسم:' : 'Name:'}</strong> {session.user?.name || locale === 'es' ? 'No especificado' : 'Not specified'}
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong>{locale === 'es' ? 'Email:' : locale === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</strong> {session.user?.email}
                </div>
                <div>
                  <strong>{locale === 'es' ? 'Miembro desde:' : locale === 'ar' ? 'عضو منذ:' : 'Member since:'}</strong> {new Date().toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'ar' ? 'ar-SA' : 'en-US')}
                </div>
              </div>
            </motion.div>
          )}
        </TabContent>
      </Container>
    </MainLayout>
  );
}

