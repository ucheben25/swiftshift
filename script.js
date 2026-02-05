(function () {
  'use strict';

  // Mobile menu
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-label', nav.classList.contains('is-open') ? 'Close menu' : 'Open menu');
    });
    document.querySelectorAll('.nav-list a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
      });
    });
  }

  // Demo tracking data: different statuses based on input length for variety
  function getDemoTimeline(trackingId) {
    var id = (trackingId || '').trim().toUpperCase();
    var seed = id.length % 4;
    var now = new Date();
    var formatTime = function (d) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' +
        d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    var events = [
      { label: 'Delivered', detail: 'Package delivered to recipient.', time: new Date(now - 2 * 3600000), done: true },
      { label: 'Out for delivery', detail: 'Driver is on the way.', time: new Date(now - 5 * 3600000), done: true },
      { label: 'At local facility', detail: 'Your City Distribution Center.', time: new Date(now - 24 * 3600000), done: true },
      { label: 'In transit', detail: 'Moving between facilities.', time: new Date(now - 48 * 3600000), done: true },
      { label: 'Picked up', detail: 'Package collected from sender.', time: new Date(now - 72 * 3600000), done: true },
      { label: 'Order received', detail: 'Shipment created.', time: new Date(now - 96 * 3600000), done: true }
    ];

    if (seed === 1) {
      events = [
        { label: 'Out for delivery', detail: 'Driver is on the way.', time: new Date(now + 2 * 3600000), done: false, active: true },
        { label: 'At local facility', detail: 'Your City Distribution Center.', time: new Date(now - 6 * 3600000), done: true },
        { label: 'In transit', detail: 'Moving between facilities.', time: new Date(now - 30 * 3600000), done: true },
        { label: 'Picked up', detail: 'Package collected from sender.', time: new Date(now - 54 * 3600000), done: true },
        { label: 'Order received', detail: 'Shipment created.', time: new Date(now - 78 * 3600000), done: true }
      ];
    } else if (seed === 2) {
      events = [
        { label: 'In transit', detail: 'Moving between facilities.', time: new Date(now - 12 * 3600000), done: false, active: true },
        { label: 'Picked up', detail: 'Package collected from sender.', time: new Date(now - 36 * 3600000), done: true },
        { label: 'Order received', detail: 'Shipment created.', time: new Date(now - 60 * 3600000), done: true }
      ];
    } else if (seed === 3) {
      events = [
        { label: 'Order received', detail: 'Shipment created. Awaiting pickup.', time: new Date(now - 1 * 3600000), done: false, active: true }
      ];
    } else {
      events[0].active = false;
      events.forEach(function (e, i) { e.done = true; });
    }

    return events.map(function (e) {
      return {
        label: e.label,
        detail: e.detail,
        time: formatTime(e.time),
        done: e.done,
        active: e.active || false
      };
    });
  }

  function getDemoStatus(trackingId) {
    var seed = (trackingId || '').trim().length % 4;
    if (seed === 0) return { text: 'Delivered', delivered: true };
    if (seed === 1) return { text: 'Out for delivery', delivered: false };
    if (seed === 2) return { text: 'In transit', delivered: false };
    return { text: 'Order received', delivered: false };
  }

  // Tracking form
  var form = document.getElementById('tracking-form');
  var input = document.getElementById('tracking-input');
  var resultEl = document.getElementById('tracking-result');
  var errorEl = document.getElementById('tracking-error');
  var statusBadge = document.getElementById('status-badge');
  var trackingIdDisplay = document.getElementById('tracking-id-display');
  var timelineEl = document.getElementById('tracking-timeline');

  if (form && input && resultEl && errorEl && statusBadge && trackingIdDisplay && timelineEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = input.value.trim();
      errorEl.hidden = true;
      resultEl.hidden = true;

      if (!value) {
        errorEl.hidden = false;
        return;
      }

      var status = getDemoStatus(value);
      var timeline = getDemoTimeline(value);

      statusBadge.textContent = status.text;
      statusBadge.classList.toggle('delivered', status.delivered);
      trackingIdDisplay.textContent = value;

      timelineEl.innerHTML = timeline.map(function (item) {
        var classes = 'timeline-item';
        if (item.done) classes += ' done';
        if (item.active) classes += ' active';
        return (
          '<div class="' + classes + '">' +
            '<span class="time">' + item.time + '</span>' +
            '<div>' +
              '<span class="label">' + item.label + '</span>' +
              (item.detail ? '<div class="detail">' + item.detail + '</div>' : '') +
            '</div>' +
          '</div>'
        );
      }).join('');

      resultEl.hidden = false;
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Contact form (demo: prevent submit, show alert)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thanks for your message! In a real site, this would be sent to the company.');
    });
  }
})();
