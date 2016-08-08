angular.module('church').filter('dateRange', function ($rootScope) {
    return function (objs, expression, start_date, end_date)
    {
        var result = [];

        // date filters
        start_date = (start_date && !isNaN(Date.parse(start_date))) ? Date.parse(start_date) : 0;
        end_date = (end_date && !isNaN(Date.parse(end_date))) ? Date.parse(end_date) : new Date().getTime();

        // if the conversations are loaded
        if (objs && objs.length > 0)
        {
            $.each(objs, function (index, obj)
            {
                var conversationDate = new Date($rootScope.$eval(expression, obj));

                if (conversationDate >= start_date && conversationDate <= end_date)
                {
                    result.push(obj);
                }
            });

            return result;
        }
    };
});