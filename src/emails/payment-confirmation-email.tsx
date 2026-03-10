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

interface PaymentConfirmationEmailProps {
  customerName: string
  customerEmail: string
  amount: number
  description: string
  paymentId: string
  paymentDate: string
  isCustomerCopy?: boolean
}

export function PaymentConfirmationEmail({
  customerName,
  customerEmail,
  amount,
  description,
  paymentId,
  paymentDate,
  isCustomerCopy = false,
}: PaymentConfirmationEmailProps) {
  const formattedDate = new Date(paymentDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Html>
      <Head />
      <Preview>
        {isCustomerCopy
          ? `Payment Confirmation - $${amount} - Dulce Antojo`
          : `Payment Received - $${amount} from ${customerName}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>Dulce Antojo</Heading>
            <Text style={tagline}>Mini Pancakes & More</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Section style={successBadge}>
              <Text style={checkmark}>&#10003;</Text>
            </Section>

            <Heading style={title}>
              {isCustomerCopy ? 'Payment Confirmed!' : 'Payment Received!'}
            </Heading>

            <Text style={subtitle}>
              {isCustomerCopy
                ? 'Thank you for your payment. Here are your receipt details.'
                : `You have received a payment from ${customerName}.`}
            </Text>

            <Hr style={divider} />

            {/* Amount */}
            <Section style={amountSection}>
              <Text style={amountLabel}>Amount Paid</Text>
              <Text style={amountValue}>${amount.toFixed(2)} USD</Text>
            </Section>

            <Hr style={divider} />

            {/* Payment Details */}
            <Heading as="h3" style={sectionTitle}>
              Payment Details
            </Heading>

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Description</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{description}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Customer</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{customerName}</Text>
              </Column>
            </Row>

            {!isCustomerCopy && (
              <Row style={row}>
                <Column style={labelColumn}>
                  <Text style={label}>Email</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={valueLink}>{customerEmail}</Text>
                </Column>
              </Row>
            )}

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Date</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{formattedDate}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column style={labelColumn}>
                <Text style={label}>Payment ID</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={valueSmall}>{paymentId}</Text>
              </Column>
            </Row>

            <Hr style={divider} />

            {/* Next Steps */}
            <Section style={nextStepsSection}>
              <Heading as="h3" style={sectionTitle}>
                {isCustomerCopy ? 'What Happens Next?' : 'Next Steps'}
              </Heading>
              <Text style={nextStepsText}>
                {isCustomerCopy
                  ? 'We will be in touch soon to confirm the details of your event. If you have any questions, feel free to reach out to us on Instagram @dulceantojo.houstontx'
                  : `Contact ${customerName} to confirm event details and schedule.`}
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

const successBadge = {
  textAlign: 'center' as const,
  marginBottom: '24px',
}

const checkmark = {
  display: 'inline-block',
  width: '60px',
  height: '60px',
  lineHeight: '60px',
  fontSize: '32px',
  color: '#FFFFFF',
  backgroundColor: '#22C55E',
  borderRadius: '50%',
  margin: '0',
}

const title = {
  color: '#22C55E',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  textAlign: 'center' as const,
}

const subtitle = {
  color: '#6B6B6B',
  fontSize: '16px',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
}

const divider = {
  borderColor: '#FFD6E0',
  margin: '24px 0',
}

const amountSection = {
  textAlign: 'center' as const,
  padding: '16px 0',
}

const amountLabel = {
  color: '#6B6B6B',
  fontSize: '14px',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
}

const amountValue = {
  color: '#22C55E',
  fontSize: '36px',
  fontWeight: '700',
  margin: '0',
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
  width: '120px',
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

const valueSmall = {
  color: '#9CA3AF',
  fontSize: '12px',
  margin: '0',
  fontFamily: 'monospace',
}

const nextStepsSection = {
  backgroundColor: '#FFF9F9',
  borderRadius: '8px',
  padding: '20px',
  border: '1px solid #FFD6E0',
}

const nextStepsText = {
  color: '#3D3D3D',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.6',
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

export default PaymentConfirmationEmail
