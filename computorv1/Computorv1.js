let degree = 0;
let equation = document.getElementById('myText');
const submit =  document.getElementById('btn').onclick = function()
{
	myId.innerHTML = '';
    try
    {
        main(equation.value);
    }
    catch(err)
    {
        return;
    }
}

function    replaceAt(str, index, ch, n)
{
    return str.substr(0, index) + ch + str.substr(index + n, str.length);
}

function    addPlus(str)
{
    let s = str;
    let i = 0;
    while(i < s.length) {
        if (i == 0) {
            if(/\d/.test(s[i])) {
                s = replaceAt(s, i, '+ ', 0);
            }
        }
        else if (s[i] == '=')
       {
            if ((/\s/.test(s[i + 1])) && (/\d/.test(s[i + 2])))
            {
                s = replaceAt(s, i + 1, ' + ', 1);
            }
        }
        i++;
    }
    return (s);
}

function    swapSign(s)
{
    let i = 0;
    let str = '';

    while (i < s.length && s[i] != '=')
    {
        str = str + s[i];
        i++;
    }
    while (i < s.length)
    {
        if (s[i] == '-')
        {
            str = str + '+';
        }
        else if (s[i] == '+')
        {
            str = str + '-';
        }
        else
        str = str + s[i];
        i++;
    }
    return (str);
}

function    slideEq(str)
{
    let s = str.replace(/ =/, '');
    s = s + '';
    return (s);
}

function    signStock(s, arr)
{
    let i = 0;

    while (i < s.length)
    {
        if (s[i] == '+' || s[i] == '-')
        {
            arr.push(s[i]);
        }
        i++;
    }
      return (arr);
}

function    moveToObj(str, signArr, splt)
{
    let s = str.replace(/\s/g, '');
    let objArr = [];
    let i = 0;
    while (i < signArr.length)
    {
        let obj =
        {
            coef: splt[i].match(/\d+(\.\d+)?/),
            x: splt[i].match(/X/i),
            exp: splt[i].match(/(\d+)(?!.*\d)/)
        }
        
        obj.coef[0] = signArr[i] + obj.coef[0];
       if (obj.exp[0] > degree)
       {
           degree = obj.exp[0];
       }
        objArr.push(obj);
        i++;
    }
    return (objArr);
}

function    reduce(objArr, degree)
{
    let i = 0;
    let grp = {}
    let grpArr = [];
    while (i <= degree)
    {
    let j = 0;
    grp = { coef:0, x:'X', exp:0 }
        while (j < objArr.length)
        {
            if (objArr[j].exp[0] == i)
            {
                grp.coef = parseFloat(grp.coef) + parseFloat(objArr[j].coef[0]);
                grp.exp = i;
            }
            j++;
        }
        grpArr.push(grp);
        i++;
    }
    return (grpArr);
}

function sqrt(n) {
    let sqrt = n / 2;
    let tmp = 0;
    while (sqrt !== tmp) {
        tmp = sqrt;
        sqrt = (tmp + n / tmp) / 2;
    }
    return sqrt;
}

function    pow2(n)
{
    return (n * n);
}

function    fixFraction(b, aa)
{
  let x = 0;
  let f = 0;
  
  if (b > aa)
  x = aa;
  else
  x = b;
  while (x >= 2)
  {
    if (b % x == 0 && aa % x == 0)
    {
      f = x;
      break;
    }
    else
    x--;
  } 
  return ([b / x,aa / x ]);
}

function    lower(a, b, delta)
{
    let z = sqrt(-delta) / (2 * a);

    myId.innerHTML += '<span style="color: blue;">Discriminant is strictly negative, the two solutions are:</span><br>';
    let ba = fixFraction(b, 2 * a);
    if (b == 0 && a != 0)
    {
        myId.innerHTML += '0 + i * '+z+'<br>';
        myId.innerHTML += '0 - i * '+z+'<br>';
    }
    else if (ba[0] == ba[1] * (-1))
    {
        myId.innerHTML += '1 + i * '+z+'<br>';
        myId.innerHTML += '1 - i * '+z+'<br>';
    }
    else if (ba[0] == ba[1])
    {
        myId.innerHTML += '-1 + i * '+z+'<br>';
        myId.innerHTML += '-1 - i * '+z+'<br>';
    }
    else if (ba[0] != ba[1])
    {
        myId.innerHTML += -ba[0]+'/'+(ba[1])+' + i * '+z+'<br>';
        myId.innerHTML += -ba[0]+'/'+(ba[1])+' - i * '+z+'<br>';
    }
}

function    equal(a, b, delta)
{
    let x0 = -b / (2 * a);
    myId.innerHTML += '<span style="color: blue;">Discriminant equals zero, the solution is:</span><br>';
    myId.innerHTML += x0+'<br>';
}

function    greater(a, b, delta)
{
    let x1 = (-b - sqrt(delta)) / (2 * a);
    let x2 = (-b + sqrt(delta)) / (2 * a);
    myId.innerHTML += '<span style="color: blue;">Discriminant is strictly positive, the two solutions are:</span><br>';
    myId.innerHTML += x1+'<br>';
    myId.innerHTML += x2+'<br>';
}

function    calculateEq(grpArr)
{
    let a = grpArr[2].coef;
    let b = grpArr[1].coef;
    let c = grpArr[0].coef;
    let delta = pow2(b) - 4 * a * c;

    if (delta < 0)
        lower(a, b, delta);
    else if (delta == 0)
        equal(a, b, delta);
    else if (delta > 0)
        greater(a, b, delta);
}

function    calculateFirstEq(grpArr)
{
    /* ax + b = 0 */
    let b = grpArr[0].coef;
    let a = grpArr[1].coef;
    let x = grpArr[1].x;

    if (a != 0 && b != 0)
        myId.innerHTML += '<span style="color: blue;">the solution is: </span>'+(-b/a)+'<br>';
    else if (a != 0 && b == 0)
        myId.innerHTML += '<span style="color: blue;">the solution is: </span>0<br>';
    else if (a == 0 && b == 0)
        myId.innerHTML += '<span style="color: blue;">the solution is: </span>all Real numbers<br>';
    else if (a == 0 && b != 0)
        myId.innerHTML += '<span style="color: blue;">the solution is: </span>no solutions<br>';
    process.exit(0);
}

function    calculateRealDegree(grpArr)
{
    let m = grpArr.length - 1;

    while (m > 0 && grpArr[m].coef == 0)
    m--;
    degree = grpArr[m].exp;
    if (degree == 0 && grpArr[0].coef == 0)
        degree = -1;
    myId.innerHTML += '<span style="color: green;">polynomial degree  </span>'+degree+'<br>';
    if (degree <= 1)
    {
        calculateFirstEq(grpArr);
        process.exit(0);
    }
    else if (degree > 2)
    {
        myId.innerHTML += '<span style="color: purple;">The polynomial degree is strictly greater than 2</span>';
        process.exit(0);
    }

}

function    prntReduce(grpArr)
{
    let i = 0;

    myId.innerHTML += '<span style="color: red;">Reduced form </span>';
    while (i < grpArr.length)
    {
        if (i != 0 && grpArr[i].coef >= 0)
        {
            myId.innerHTML += ' + ';
            myId.innerHTML += grpArr[i].coef+' * '+grpArr[i].x+'<sup>'+grpArr[i].exp+'</sup>';
        }
        else if (i != 0 && grpArr[i].coef < 0)
        {
            myId.innerHTML += ' - ';
            myId.innerHTML += (grpArr[i].coef * -1)+' * '+grpArr[i].x+'<sup>'+grpArr[i].exp+'</sup>';
        }
        else
            myId.innerHTML += grpArr[i].coef+' * '+grpArr[i].x+'<sup>'+grpArr[i].exp+'</sup>';
        i++;
    }
    myId.innerHTML += ' = 0<br>';
    calculateRealDegree(grpArr)
}

function    main(input)
{
    debugger;
    let signArr = [];
    let s = addPlus(input);
    s = swapSign(s);
    s = slideEq(s);
    signArr = signStock(s, signArr);
    let splt = s.split(/[+-]/);
    splt.shift();
    let objArr = moveToObj(s, signArr, splt);
    let grpArr = reduce(objArr, degree);
    prntReduce(grpArr);
    calculateEq(grpArr);
}
