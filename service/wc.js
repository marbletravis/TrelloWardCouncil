angular.module('church').factory('wc', function () {
    function KeyPair(id, val) {
        this.id = id;
        this.val = val;
    }
    var wc = {
        opening: [
            new KeyPair('thought', "Thought"),
            new KeyPair('handbook', "Handbook"),
            new KeyPair('sabbath', "Sabbath"),
            new KeyPair('ppi', "PPI")
        ],
        keyIndicators: [
            new KeyPair('endowed', 'Endowed W/Recommend'),
            new KeyPair('elders', 'Prospective Elders'),
            new KeyPair('sacrament', 'Sacrament Attendance')
        ],
        councilMembers: {
            1: new KeyPair(1, 'Bishop'),
            2: new KeyPair(2, '1st Counselor'),
            3: new KeyPair(3, '2nd Counselor'),
            4: new KeyPair(4, 'Ward Clerk'),
            5: new KeyPair(5, 'Exec Sec'),
            6: new KeyPair(6, 'Elders'),
            7: new KeyPair(7, 'Young Women'),
            8: new KeyPair(8, 'Relief Society'),
            9: new KeyPair(9, 'Primary'),
            10: new KeyPair(10, 'Missionaries'),
            11: new KeyPair(11, 'HP'),
            12: new KeyPair(12, 'Family History'),
            13: new KeyPair(13, 'Employment'),
            14: new KeyPair(14, 'Sunday School'),
            15: new KeyPair(15, 'Young Men'),
        }
    };
    return wc;
});