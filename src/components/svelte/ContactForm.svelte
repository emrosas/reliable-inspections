<script lang="ts">
  let name = $state('')
  let email = $state('')
  let phone = $state('')
  let property = $state('')
  let message = $state('')
  let status: 'idle' | 'loading' | 'success' | 'error' = $state('idle')
  let statusMessage = $state('')

  function validatePhone(value: string): boolean {
    return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value.trim())
  }

  function trackContactForm() {
    if (typeof window !== 'undefined' && 'fathom' in window) {
      ;(window as any).fathom.trackEvent('contact_form_submit')
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault()
    status = 'loading'

    if (!validatePhone(phone)) {
      status = 'error'
      statusMessage = 'Please enter a valid phone number.'
      return
    }

    try {
      const res = await fetch('https://rserver-clients-ay3z3.sevalla.app/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: ['erick@erreagency.com', 'mike@reliableinspectionsky.com'],
          fields: [
            { name: 'Full Name', value: name },
            { name: 'Email', value: email },
            { name: 'Phone', value: phone },
            { name: 'Property Address', value: property },
            { name: 'Message', value: message },
          ],
        }),
      })

      if (res.ok) {
        status = 'success'
        statusMessage = 'Thank you! We will get back to you within 24 hours.'
        trackContactForm()
        name = ''
        email = ''
        phone = ''
        property = ''
        message = ''
      } else {
        status = 'error'
        statusMessage = 'Something went wrong. Please try again or call us directly.'
      }
    } catch {
      status = 'error'
      statusMessage = 'Something went wrong. Please try again or call us directly.'
    }
  }
</script>

<div class="rounded-2xl border border-light-3 bg-white p-el-xl">
  {#if status === 'success'}
    <div class="flex flex-col items-center justify-center py-el-xl text-center gap-el-lg">
      <div class="flex size-14 items-center justify-center rounded-full bg-background-alt">
        <svg class="text-green-2 size-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <div>
        <p class="text-body-lg font-semibold text-dark-3">Message Sent</p>
        <p class="text-body-sm text-dark-1 mt-el-xs">{statusMessage}</p>
      </div>
      <button
        onclick={() => (status = 'idle')}
        class="text-body-sm text-green-2 underline-offset-2 hover:underline"
      >
        Send another message
      </button>
    </div>
  {:else}
    <form onsubmit={handleSubmit} class="flex flex-col gap-el-lg">

      <!-- Name + Email -->
      <div class="grid gap-gutter sm:grid-cols-2">
        <div class="flex flex-col gap-el-sm">
          <label for="name" class="text-body-sm font-medium text-dark-3">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="John Doe"
            bind:value={name}
            class="rounded-sm bg-light-4/15 px-el-lg py-el-md text-body-sm text-dark-3 placeholder:text-dark-1 transition focus:outline-none focus:ring-1 focus:ring-green-2"
          />
        </div>
        <div class="flex flex-col gap-el-sm">
          <label for="email" class="text-body-sm font-medium text-dark-3">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="john@example.com"
            bind:value={email}
            class="rounded-sm bg-light-4/15 px-el-lg py-el-md text-body-sm text-dark-3 placeholder:text-dark-1 transition focus:outline-none focus:ring-1 focus:ring-green-2"
          />
        </div>
      </div>

      <!-- Phone + Property Address -->
      <div class="grid gap-gutter sm:grid-cols-2">
        <div class="flex flex-col gap-el-sm">
          <label for="phone" class="text-body-sm font-medium text-dark-3">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="(555) 000-0000"
            bind:value={phone}
            class="rounded-sm bg-light-4/15 px-el-lg py-el-md text-body-sm text-dark-3 placeholder:text-dark-1 transition focus:outline-none focus:ring-1 focus:ring-green-2"
          />
        </div>
        <div class="flex flex-col gap-el-sm">
          <label for="property" class="text-body-sm font-medium text-dark-3">Property Address</label>
          <input
            type="text"
            id="property"
            name="property"
            placeholder="123 Street, City, KY"
            bind:value={property}
            class="rounded-sm bg-light-4/15 px-el-lg py-el-md text-body-sm text-dark-3 placeholder:text-dark-1 transition focus:outline-none focus:ring-1 focus:ring-green-2"
          />
        </div>
      </div>

      <!-- Message -->
      <div class="flex flex-col gap-el-sm">
        <label for="message" class="text-body-sm font-medium text-dark-3">How can we help?</label>
        <textarea
          id="message"
          name="message"
          required
          rows="5"
          placeholder="Tell us about the property and your timeline…"
          bind:value={message}
          class="resize-none rounded-sm bg-light-4/15 px-el-lg py-el-md text-body-sm text-dark-3 placeholder:text-dark-1 transition focus:outline-none focus:ring-1 focus:ring-green-2"
        ></textarea>
      </div>

      <!-- Error message -->
      {#if status === 'error'}
        <p class="text-body-sm text-warm-3">{statusMessage}</p>
      {/if}

      <!-- Submit -->
      <button
        type="submit"
        disabled={status === 'loading'}
        class="inline-flex w-full items-center justify-center gap-el-xs rounded-sm bg-linear-to-tr from-green-5 to-green-3 px-el-lg py-el-md text-body-md text-white transition active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {#if status === 'loading'}
          Sending…
        {:else}
          Send Message
          <svg class="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        {/if}
      </button>

    </form>
  {/if}
</div>
