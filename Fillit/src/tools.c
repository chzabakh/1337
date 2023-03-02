/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tools.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/19 15:00:29 by chzabakh          #+#    #+#             */
/*   Updated: 2019/06/24 21:33:16 by ahkhilad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

void	ft_lstrmv(t_sto **head)
{
	t_sto	*next;

	while (*head)
	{
		next = (*head)->next;
		free(*head);
		*head = next;
	}
}

void	ft_boarddel(char **board)
{
	int		i;

	i = 0;
	while (board[i])
	{
		free(board[i]);
		i++;
	}
	free(board);
}

int		ft_chk_plc(t_sto *hd, char **brd, int dim, t_var1 ij)
{
	int		k;
	int		l;
	int		t;
	int		cpt;

	k = 0;
	l = 0;
	t = 0;
	cpt = 0;
	while (t < 4 && k < 4 && l < 4 && cpt < 4)
	{
		if (ij.i + hd->x[k] < dim &&
				(brd[ij.i + hd->x[k]][ij.j + hd->y[l]] == '.')
				&& (hd->x[k] + ij.i < dim && hd->y[l] + ij.j < dim))
		{
			k++;
			l++;
			cpt++;
		}
		t++;
	}
	if (cpt == 4)
		return (1);
	return (0);
}

void	ft_plc_tet(t_sto *hd, char **board, int i, int j)
{
	board[i + hd->x[0]][j + hd->y[0]] = hd->tet[hd->x[0]][hd->y[0]];
	board[i + hd->x[1]][j + hd->y[1]] = hd->tet[hd->x[0]][hd->y[0]];
	board[i + hd->x[2]][j + hd->y[2]] = hd->tet[hd->x[0]][hd->y[0]];
	board[i + hd->x[3]][j + hd->y[3]] = hd->tet[hd->x[0]][hd->y[0]];
}

void	ft_rmv_tet(t_sto *hd, char **board, int i, int j)
{
	board[i + hd->x[0]][j + hd->y[0]] = '.';
	board[i + hd->x[1]][j + hd->y[1]] = '.';
	board[i + hd->x[2]][j + hd->y[2]] = '.';
	board[i + hd->x[3]][j + hd->y[3]] = '.';
}
