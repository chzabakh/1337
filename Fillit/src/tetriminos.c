/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tetriminos.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/25 15:57:11 by chzabakh          #+#    #+#             */
/*   Updated: 2019/06/27 14:54:32 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

t_sto	*ft_corner(t_sto *hd)
{
	t_var2		v;
	static char lettre = 'A';

	v.i = 0;
	v.c = 0;
	while (v.i < 4)
	{
		v.j = 0;
		while (v.j < 4)
		{
			if (hd->tet[v.i + hd->imin][v.j + hd->jmin] == '#')
			{
				hd->tet[v.i + hd->imin][v.j + hd->jmin] = '.';
				hd->tet[v.i][v.j] = lettre;
				hd->x[v.c] = v.i;
				hd->y[v.c] = v.j;
				v.c++;
			}
			v.j++;
		}
		v.i++;
	}
	lettre++;
	return (hd);
}

t_sto	*ft_nodes(t_sto *hd, char *tab)
{
	t_var	v;

	v.i = 0;
	v.k = 0;
	hd->imin = 3;
	hd->jmin = 3;
	while (v.i < 4)
	{
		v.j = 0;
		while (v.j < 4)
		{
			hd->tet[v.i][v.j] = tab[v.k];
			hd->tet[v.i][v.j] == '#' && v.i < hd->imin ? hd->imin = v.i : 0;
			hd->tet[v.i][v.j] == '#' && v.j < hd->jmin ? hd->jmin = v.j : 0;
			v.j++;
			v.k++;
		}
		v.i++;
	}
	return (ft_corner(hd));
}

t_sto	*ft_work(char *fs)
{
	t_sto	*hd;
	t_sto	*tmp;
	char	**tab;
	int		i;

	i = 0;
	if (!(hd = (t_sto *)malloc(sizeof(t_sto))))
		return (NULL);
	tmp = hd;
	tab = ft_strsplit(fs, '\n');
	while (tab[i] != NULL)
	{
		tmp = ft_nodes(tmp, tab[i]);
		if (tab[i + 1] != NULL)
			tmp->next = (t_sto*)malloc(sizeof(t_sto));
		else
			tmp->next = NULL;
		tmp = tmp->next;
		i++;
	}
	ft_boarddel(tab);
	return (hd);
}

t_sto	*ft_read3(int fd)
{
	t_var4	vr;

	vr.i = 0;
	vr.fs = ft_strnew(0);
	while (get_next_line(fd, &vr.line) == 1)
	{
		vr.i++;
		vr.fstmp = ft_strjoin(vr.fs, vr.line);
		if (vr.fs)
			free(vr.fs);
		vr.fs = vr.fstmp;
		ft_strdel(&vr.line);
		if (vr.i == 4)
		{
			vr.fstmp = ft_strjoin(vr.fs, "\n");
			if (vr.fs)
				free(vr.fs);
			vr.fs = vr.fstmp;
			vr.i = -1;
		}
	}
	ft_strdel(&vr.line);
	vr.head = ft_work(vr.fs);
	free(vr.fs);
	return (vr.head);
}
