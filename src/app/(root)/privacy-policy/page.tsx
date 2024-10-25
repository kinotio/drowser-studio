const Page = () => {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <main className='container mx-auto px-4 py-8 max-w-4xl'>
        <h1 className='text-4xl font-bold mb-6'>Privacy Policy</h1>
        <p className='text-muted-foreground mb-6'>Last updated: October 25, 2024</p>

        <section className='space-y-4 mb-8'>
          <p>
            This Privacy Policy describes Our policies and procedures on the collection, use and
            disclosure of Your information when You use the Service and tells You about Your privacy
            rights and how the law protects You.
          </p>
          <p>
            We use Your Personal data to provide and improve the Service. By using the Service, You
            agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Interpretation and Definitions</h2>
          <h3 className='text-xl font-medium mb-2'>Interpretation</h3>
          <p className='mb-4'>
            The words of which the initial letter is capitalized have meanings defined under the
            following conditions. The following definitions shall have the same meaning regardless
            of whether they appear in singular or in plural.
          </p>
          <h3 className='text-xl font-medium mb-2'>Definitions</h3>
          <p className='mb-2'>For the purposes of this Privacy Policy:</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <strong>Account</strong> means a unique account created for You to access our Service
              or parts of our Service.
            </li>
            <li>
              <strong>Affiliate</strong> means an entity that controls, is controlled by or is under
              common control with a party, where &quot;control&quot; means ownership of 50% or more
              of the shares, equity interest or other securities entitled to vote for election of
              directors or other managing authority.
            </li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Collecting and Using Your Personal Data</h2>
          <h3 className='text-xl font-medium mb-2'>Types of Data Collected</h3>
          <h4 className='text-lg font-medium mb-2'>Personal Data</h4>
          <p className='mb-2'>
            While using Our Service, We may ask You to provide Us with certain personally
            identifiable information that can be used to contact or identify You. Personally
            identifiable information may include, but is not limited to:
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Usage Data</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Contact Us</h2>
          <p className='mb-2'>
            If you have any questions about this Privacy Policy, You can contact us:
          </p>
          <ul className='list-disc pl-6'>
            <li>By email: contact@kinotio.io</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Page
