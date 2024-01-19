<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
    @vite(['resources/css/app.scss','resources/js/app.jsx'])
    @inertiaHead
  </head>
  <body>
    <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>
        <div class="main-wrapper main-wrapper-1">
            <div class="main-content">
                @inertia
            </div>
        </div>
    </div>
    <script src="{{ asset('assets/js/app.min.js') }}"></script>
    <script src="{{ asset('assets/js/custom.js') }}"></script>
    <script src="{{ asset('assets/js/scripts.js') }}"></script>
  </body>
</html>
