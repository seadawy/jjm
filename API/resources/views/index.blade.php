<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Routes</title>
    <style>
        /* public/css/styles.css */

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 28px;
            font-weight: 600;
            color: #333;
            margin-bottom: 20px;
            border-bottom: 2px solid #e1e1e1;
            padding-bottom: 10px;
        }

        .route-group {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 2px solid #e1e1e1;
        }

        .route-group h2 {
            font-size: 22px;
            font-weight: 500;
            color: #555;
            margin-bottom: 15px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #e1e1e1;
        }

        th {
            background-color: #f8f9fa;
            color: #555;
            font-weight: 500;
        }


        tr:hover {
            background-color: #ccc;
        }

        .method-get {
            color: #28a745;
            /* Green */
            font-weight: bold;
        }

        .method-post {
            color: #007bff;
            /* Blue */
            font-weight: bold;
        }

        .method-put {
            color: #ffc107;
            /* Yellow */
            font-weight: bold;
        }

        .method-delete {
            color: #dc3545;
            /* Red */
            font-weight: bold;
        }

        .method-patch {
            color: #6f42c1;
            /* Purple */
            font-weight: bold;
        }

        .method-other {
            color: #6c757d;
            /* Gray */
            font-weight: bold;
        }

        .route-group {
            margin-top: 20px;
            padding: 10px;
            border-radius: 8px;
            background-color: #f1f5f9;
            position: relative;
        }

        .route-group h2 {
            font-size: 22px;
            font-weight: 500;
            color: #333;
            margin-bottom: 10px;
            cursor: pointer;
        }

        /* Style for dropdown content */
        .group-content {
            display: none;
            overflow: hidden;
        }

        /* Style for dropdown tables */
        .group-content table {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }

        /* Background colors for different groups */
        .group-1 {
            background-color: #e7f0ff;
        }

        /* Light Blue */
        .group-2 {
            background-color: #e2f7e2;
        }

        /* Light Green */
        .group-3 {
            background-color: #fff4e3;
        }

        /* Light Orange */
        .group-4 {
            background-color: #f5e3f5;
        }

        /* Light Purple */

        /* Style for hover and active states */
        .route-group.active h2 {
            background-color: #cfd7ff;
            color: #003d7a;
            border-radius: 4px;
        }

        .route-group.active .group-content {
            display: block;
        }

        .method-get {
            background-color: #e7f0ff;
            /* Light Blue */
        }

        .method-post {
            background-color: #e2f7e2;
            /* Light Green */
        }

        .method-put {
            background-color: #fff4e3;
            /* Light Orange */
        }

        .method-delete {
            background-color: #f5e3f5;
            /* Light Purple */
        }

        .method-patch {
            background-color: #e9d8fd;
            /* Light Lavender */
        }

        .method-other {
            background-color: #f4f4f9;
            /* Light Gray */
        }

        /* Ensure proper text color and readability */
        td {
            color: #333;
            font-size: 14px;
        }
    </style>
</head>

<body>

    <body>
        <div class="container">
            <h1>API Routes</h1>

            @foreach ($routes->groupBy('group') as $group => $groupRoutes)
            <div class="route-group {{ 'group-' . ($loop->index + 1) }}">
                <h2>{{ $group }}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>URI</th>
                            <th>Name</th>
                            <th>Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($groupRoutes as $route)
                        <tr class="{{ 'method-' . strtolower($route['method']) }}">
                            <td>{{ $route['uri'] }}</td>
                            <td>{{ $route['name'] }}</td>
                            <td>
                                {{ $route['method'] }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            @endforeach
        </div>
    </body>

</html>
