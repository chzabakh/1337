/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   check2.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ahkhilad <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/18 15:18:45 by ahkhilad          #+#    #+#             */
/*   Updated: 2019/05/29 15:41:29 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

int		ft_prt1(char *fs, int lnk, int i, int j)
{
	if (j == 0)
	{
		(fs[i + 1] == '#') ? lnk++ : lnk;
		(fs[i + 5] == '#') ? lnk++ : lnk;
	}
	if (j == 1 || j == 2)
	{
		(fs[i - 1] == '#') ? lnk++ : lnk;
		(fs[i + 1] == '#') ? lnk++ : lnk;
		(fs[i + 5] == '#') ? lnk++ : lnk;
	}
	if (j == 3)
	{
		(fs[i - 1] == '#') ? lnk++ : lnk;
		(fs[i + 5] == '#') ? lnk++ : lnk;
	}
	if (j == 5 || j == 10)
	{
		(fs[i - 5] == '#') ? lnk++ : lnk;
		(fs[i + 1] == '#') ? lnk++ : lnk;
		(fs[i + 5] == '#') ? lnk++ : lnk;
	}
	return (lnk);
}

int		ft_prt2(char *fs, int lnk, int i, int j)
{
	if (j == 6 || j == 7 || j == 11 || j == 12)
	{
		(fs[i - 1] == '#') ? lnk++ : lnk;
		(fs[i + 1] == '#') ? lnk++ : lnk;
		(fs[i - 5] == '#') ? lnk++ : lnk;
		(fs[i + 5] == '#') ? lnk++ : lnk;
	}
	if (j == 8 || j == 13)
	{
		(fs[i - 1] == '#') ? lnk++ : lnk;
		(fs[i - 5] == '#') ? lnk++ : lnk;
		(fs[i + 5] == '#') ? lnk++ : lnk;
	}
	return (lnk);
}

int		ft_prt3(char *fs, int lnk, int i, int j)
{
	if (j == 15)
	{
		(fs[i - 5] == '#') ? lnk++ : lnk;
		(fs[i + 1] == '#') ? lnk++ : lnk;
	}
	if (j == 16 || j == 17)
	{
		(fs[i - 5] == '#') ? lnk++ : lnk;
		(fs[i + 1] == '#') ? lnk++ : lnk;
		(fs[i - 1] == '#') ? lnk++ : lnk;
	}
	if (j == 18)
	{
		(fs[i - 5] == '#') ? lnk++ : lnk;
		(fs[i - 1] == '#') ? lnk++ : lnk;
	}
	return (lnk);
}

int		ft_validate_tetriminos(char *fs)
{
	int		i;
	int		j;
	int		lnk;
	int		links;

	i = 0;
	while (fs[i] != '\0')
	{
		j = 0;
		lnk = 0;
		links = 0;
		while (j <= 19 && fs[i + 1] != '\0')
		{
			if (fs[i] == '#')
				links = ft_prt1(fs, lnk, i, j) + ft_prt2(fs, lnk, i, j)
					+ ft_prt3(fs, lnk, i, j) + links;
			i++;
			j++;
		}
		if (links == 6 || links == 8)
			i++;
		else
			return (0);
	}
	return (1);
}
