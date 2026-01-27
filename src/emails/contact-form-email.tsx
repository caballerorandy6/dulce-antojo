import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components'

interface ContactFormEmailProps {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  guestCount: string
  services: string[]
  message?: string
}

export function ContactFormEmail({
  name,
  email,
  phone,
  eventType,
  eventDate,
  guestCount,
  services,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Quote Request from {name} - Dulce Antojo</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>Dulce Antojo</Heading>
            <Text style={tagline}>Mini Pancakes & More</Text>
          </Section>

          {/* Title */}
          <Section style={content}>
            <Heading style={title}>New Quote Request</Heading>
            <Text style={subtitle}>
              You have received a new inquiry from your website.
            </Text>

            <Hr style={divider} />

            {/* Customer Info */}
            <Heading as="h3" style={sectionTitle}>
              Customer Information
            </Heading>

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Name</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{name}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Email</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={valueLink}>{email}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Phone</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={valueLink}>{phone}</Text>
              </Column>
            </Row>

            <Hr style={divider} />

            {/* Event Details */}
            <Heading as="h3" style={sectionTitle}>
              Event Details
            </Heading>

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Event Type</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{eventType}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Event Date</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{formatDate(eventDate)}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Guest Count</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{guestCount} guests</Text>
              </Column>
            </Row>

            <Hr style={divider} />

            {/* Services */}
            <Heading as="h3" style={sectionTitle}>
              Requested Services
            </Heading>

            <Section style={servicesContainer}>
              {services.map((service, index) => (
                <Text key={index} style={serviceItem}>
                  • {service}
                </Text>
              ))}
            </Section>

            {/* Message */}
            {message && (
              <>
                <Hr style={divider} />
                <Heading as="h3" style={sectionTitle}>
                  Additional Message
                </Heading>
                <Section style={messageBox}>
                  <Text style={messageText}>{message}</Text>
                </Section>
              </>
            )}

            <Hr style={divider} />

            {/* CTA */}
            <Section style={ctaSection}>
              <Text style={ctaText}>
                Reply directly to this email to respond to {name}.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Dulce Antojo - Mini Pancakes & More
            </Text>
            <Text style={footerText}>Houston, TX</Text>
            <Text style={footerLink}>@dulceantojo.houstontx</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Styles
const main = {
  backgroundColor: '#FFE4EC',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
}

const header = {
  backgroundColor: '#E84A7A',
  borderRadius: '12px 12px 0 0',
  padding: '30px 40px',
  textAlign: 'center' as const,
}

const logo = {
  color: '#FFFFFF',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
  fontFamily: 'Georgia, serif',
}

const tagline = {
  color: '#FFD6E0',
  fontSize: '14px',
  margin: '8px 0 0 0',
}

const content = {
  backgroundColor: '#FFFFFF',
  padding: '40px',
}

const title = {
  color: '#E84A7A',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 8px 0',
}

const subtitle = {
  color: '#6B6B6B',
  fontSize: '16px',
  margin: '0 0 24px 0',
}

const divider = {
  borderColor: '#FFD6E0',
  margin: '24px 0',
}

const sectionTitle = {
  color: '#E84A7A',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 16px 0',
}

const row = {
  marginBottom: '12px',
}

const labelColumn = {
  width: '140px',
  verticalAlign: 'top' as const,
}

const valueColumn = {
  verticalAlign: 'top' as const,
}

const label = {
  color: '#6B6B6B',
  fontSize: '14px',
  margin: '0',
  fontWeight: '500',
}

const value = {
  color: '#3D3D3D',
  fontSize: '14px',
  margin: '0',
  fontWeight: '600',
}

const valueLink = {
  color: '#E84A7A',
  fontSize: '14px',
  margin: '0',
  fontWeight: '600',
}

const servicesContainer = {
  backgroundColor: '#FFF9F9',
  borderRadius: '8px',
  padding: '16px 20px',
  border: '1px solid #FFD6E0',
}

const serviceItem = {
  color: '#3D3D3D',
  fontSize: '14px',
  margin: '4px 0',
}

const messageBox = {
  backgroundColor: '#FFF9F9',
  borderRadius: '8px',
  padding: '16px 20px',
  border: '1px solid #FFD6E0',
}

const messageText = {
  color: '#3D3D3D',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
}

const ctaSection = {
  textAlign: 'center' as const,
  padding: '16px 0 0 0',
}

const ctaText = {
  color: '#6B6B6B',
  fontSize: '14px',
  margin: '0',
}

const footer = {
  backgroundColor: '#E84A7A',
  borderRadius: '0 0 12px 12px',
  padding: '24px 40px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#FFD6E0',
  fontSize: '12px',
  margin: '0 0 4px 0',
}

const footerLink = {
  color: '#FFFFFF',
  fontSize: '12px',
  margin: '8px 0 0 0',
  fontWeight: '600',
}

export default ContactFormEmail
