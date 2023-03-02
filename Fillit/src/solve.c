/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   solve.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ahkhilad <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/21 12:41:46 by ahkhilad          #+#    #+#             */
/*   Updated: 2019/06/24 16:16:34 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

void	ft_prnt(char **board)
{
	int		i;

	i = 0;
	while (board[i])
	{
		ft_putendl(board[i]);
		i++;
	}
}

int		ft_solve(t_sto *head, char **board, int dim)
{
	t_var1	ij;

	ij.i = 0;
	if (head == NULL)
		return (1);
	while (board[ij.i])
	{
		ij.j = 0;
		while (board[ij.i][ij.j])
		{
			if (ft_chk_plc(head, board, dim, ij) == 1)
			{
				ft_plc_tet(head, board, ij.i, ij.j);
				if (ft_solve(head->next, board, dim))
					return (1);
				else
					ft_rmv_tet(head, board, ij.i, ij.j);
			}
			ij.j++;
		}
		ij.i++;
	}
	return (0);
}

void	ft_bt(t_sto *head, int dim)
{
	char	**board;
	int		i;

	i = 0;
	board = ft_board(dim);
	while (!(ft_solve(head, board, dim)))
	{
		dim++;
		ft_boarddel(board);
		board = ft_board(dim);
	}
	ft_prnt(board);
	ft_boarddel(board);
	board = NULL;
}
